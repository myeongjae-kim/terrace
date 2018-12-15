package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"net/http"
	"time"

	"golang.org/x/crypto/acme/autocert"
)

// HandlerMap is a map whose key is a string and value is a handler
type HandlerMap map[string]func(http.ResponseWriter, *http.Request)

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
	for uri, handler := range handlerMap {
		mux.HandleFunc(uri, handler)
	}

	return makeServerFromMux(mux)
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

func setHTTPSServer(handlerMap HandlerMap) *http.Server {
	hostPolicy := func(ctx context.Context, host string) error {
		// allowedHosts are small, so use complete search.
		// If it is slow, use hash set
		allowedHosts := [...]string{
			// "myeongjae.kim",
			// "www.myeongjae.kim",
			"live.myeongjae.kim",
			"book.myeongjae.kim",
		}

		// Check if the host is allowed
		found := false
		for i := range allowedHosts {
			if host == allowedHosts[i] {
				found = true
				break
			}
		}

		if found {
			return nil
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
	httpsSrv.Addr = ":443"
	httpsSrv.TLSConfig = &tls.Config{GetCertificate: m.GetCertificate}

	return httpsSrv
}

func runServers(handlerMap HandlerMap) (*http.Server, *http.Server) {
	var m *autocert.Manager

	var httpsSrv *http.Server
	if flgProduction {
		httpsSrv = setHTTPSServer(handlerMap)
	} else {
		httpsSrv = nil
	}

	var httpSrv *http.Server
	if flgRedirectHTTPtoHTTPS {
		httpSrv = makeHTTPtoHTTPSRedirectServer()
	} else {
		httpSrv = makeHTTPServer(handlerMap)
	}

	// allow autocer handle Let's Encrypt callbacks over http
	if m != nil {
		httpSrv.Handler = m.HTTPHandler(httpSrv.Handler)
	}

	httpSrv.Addr = ":80"

	return httpSrv, httpsSrv
}
