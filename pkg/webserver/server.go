package webserver

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"golang.org/x/crypto/acme/autocert"
)

type (
	// HandlerMap is a map whose key is a string and value is a handler
	HandlerMap map[string]func(http.ResponseWriter, *http.Request)
	// HTTPSServer is a simple wrapper of *http.Server for distinguish it from HTTPServer
	HTTPSServer *http.Server
	// HTTPServer is a simple wrapper of *http.Server for distinguish it from HTTPSServer
	HTTPServer *http.Server
)

var (
	flagRedirectToHTTPS = false
	httpPort            = "80"
	httpsPort           = "443"
)

// SetRedirectToHTTPS turns on redirection if its argument has true.
func SetRedirectToHTTPS(b bool) {
	flagRedirectToHTTPS = b
}

// SetHTTPPort sets port number of http server. Default value is 80.
func SetHTTPPort(p int) {
	httpPort = strconv.Itoa(p)
	log.Printf("(SetHTTPPort) set http port number to %s\n", httpPort)
}

// SetHTTPSPort sets port number of https server. Default value is 443.
func SetHTTPSPort(p int) {
	httpsPort = strconv.Itoa(p)
	log.Printf("(SetHTTPSPort) set https port number to %s\n", httpsPort)
}

// InitAndRunServers initializes https and http servers and run them.
func InitAndRunServers(handlerMap HandlerMap, allowedHosts []string) {
	RunServers(InitServers(handlerMap, allowedHosts))
}

// InitServers initialize http and https servers and return them
func InitServers(handlerMap HandlerMap, allowedHosts []string) (HTTPSServer, HTTPServer) {
	var m *autocert.Manager
	var httpsSrv HTTPSServer
	var httpSrv HTTPServer

	httpsSrv, m = makeHTTPSServer(handlerMap, allowedHosts)
	if flagRedirectToHTTPS {
		httpSrv = makeHTTPtoHTTPSRedirectServer()
	} else {
		httpSrv = makeHTTPServer(handlerMap)
	}

	// allow autocert handle Let's Encrypt callbacks over http
	if m != nil {
		httpSrv.Handler = m.HTTPHandler(httpSrv.Handler)
	}

	httpSrv.Addr = ":" + httpPort

	return httpsSrv, httpSrv
}

// RunServers run https and http servers. If httpsSrv is nil, it runs only http server
func RunServers(httpsSrvWrapper HTTPSServer, httpSrvWrapper HTTPServer) {
	var httpsSrv *http.Server
	var httpSrv *http.Server
	httpsSrv = httpsSrvWrapper
	httpSrv = httpSrvWrapper

	if httpSrv == nil {
		log.Fatalln("(RunServers) http server cannot be ready to run.")
	}

	if httpsSrv != nil {
		go func() {
			log.Printf("(RunServers) Starting HTTPS server on %s\n", httpsSrv.Addr)
			if err := httpsSrv.ListenAndServeTLS("", ""); err != nil {
				log.Fatalf("(RunServers) httpsSrv.ListenAndServeTLS() failed with %s", err)
			}
		}()
	}

	log.Printf("(RunServers) Starting HTTP server on %s\n", httpSrv.Addr)
	if err := httpSrv.ListenAndServe(); err != nil {
		log.Fatalf("(RunServers) httpSrv.ListenAndServe() failed with %s", err)
	}
}

func makeServerFromMux(mux *http.ServeMux) *http.Server {
	// set timeouts so that a slow or malicious client doesn't
	// hold resources forever
	return &http.Server{
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 5 * time.Second,
		IdleTimeout:  120 * time.Second,
		Handler:      mux,
	}
}

func makeHTTPServer(handlerMap HandlerMap) *http.Server {
	mux := http.NewServeMux()

	// Register handlers to mux
	for uri, handler := range handlerMap {
		mux.HandleFunc(uri, handler)
	}

	return makeServerFromMux(mux)
}

func makeHTTPSServer(handlerMap HandlerMap, allowedHosts []string) (*http.Server, *autocert.Manager) {
	hostPolicy := func(ctx context.Context, host string) error {

		// Check if the host is allowed
		for i := range allowedHosts {
			if host == allowedHosts[i] {
				return nil
			}
		}

		return fmt.Errorf("acme/autocert: %s is not an allowed host", host)
	}

	dataDir := "."
	m := &autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: hostPolicy,
		Cache:      autocert.DirCache(dataDir),
	}

	httpsSrv := makeHTTPServer(handlerMap)
	httpsSrv.Addr = ":" + httpsPort
	httpsSrv.TLSConfig = &tls.Config{GetCertificate: m.GetCertificate}

	return httpsSrv, m
}

func makeHTTPtoHTTPSRedirectServer() *http.Server {
	handleRedirect := func(w http.ResponseWriter, r *http.Request) {
		newURI := "https://" + r.Host + r.URL.String()
		http.Redirect(w, r, newURI, http.StatusFound)
	}
	mux := &http.ServeMux{}
	mux.HandleFunc("/", handleRedirect)
	return makeServerFromMux(mux)
}
