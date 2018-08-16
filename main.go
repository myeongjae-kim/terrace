package main

// Command-line options:
//   -production : enables HTTPS on port 443
//   -redirect-to-https : redirect HTTP to HTTTPS

// TODO: If redirection is on at the server side, infinit loop between
// http and https occurs. This is because of Cloudflare. It also has
// redirection function, and these two conflits to each other.
// Therefore, turn off redirect option at the server side

import (
	"context"
	"crypto/tls"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/crypto/acme/autocert"
)

var (
	flgProduction          = false
	flgRedirectHTTPtoHTTPS = false
)

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

func makeHTTPServer() *http.Server {
	mux := http.NewServeMux()
	mux.HandleFunc("/", sampleHandler)
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

func parseFlags() {
	flag.BoolVar(
		&flgProduction,
		"production",
		false,
		"if true, we start HTTPS server")

	flag.BoolVar(
		&flgRedirectHTTPtoHTTPS,
		"redirect-to-https",
		false,
		"if true, we redirect HTTP to HTTPS")

	flag.Parse()

	if flgProduction {
		log.Println("flgProduction is set.")
	}

	if flgRedirectHTTPtoHTTPS {
		log.Println("flgRedirectHTTPtoHTTPS is set.")
	}
}

func setLogger() {
	f, err := os.OpenFile("log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	mw := io.MultiWriter(os.Stdout, f)
	log.SetOutput(mw)
	log.Println("Logger is ready.")
}

func main() {
	setLogger()
	parseFlags()
	var m *autocert.Manager

	var httpsSrv *http.Server
	if flgProduction {
		hostPolicy := func(ctx context.Context, host string) error {
			allowedHosts := [...]string{
				"myeongjae.kim",
				"www.myeongjae.kim",
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
		m = &autocert.Manager{
			Prompt:     autocert.AcceptTOS,
			HostPolicy: hostPolicy,
			Cache:      autocert.DirCache(dataDir),
		}

		httpsSrv = makeHTTPServer()
		httpsSrv.Addr = ":443"
		httpsSrv.TLSConfig = &tls.Config{GetCertificate: m.GetCertificate}

		go func() {
			log.Printf("Starting HTTPS server on %s\n", httpsSrv.Addr)
			if err := httpsSrv.ListenAndServeTLS("", ""); err != nil {
				log.Fatalf("httpsSrv.ListenAndServeTLS() failed with %s", err)
			}
		}()
	}

	var httpSrv *http.Server
	if flgRedirectHTTPtoHTTPS {
		httpSrv = makeHTTPtoHTTPSRedirectServer()
	} else {
		httpSrv = makeHTTPServer()
	}

	// allow autocer handle Let's Encrypt callbacks over http
	if m != nil {
		httpSrv.Handler = m.HTTPHandler(httpSrv.Handler)
	}

	httpSrv.Addr = ":80"

	log.Printf("Starting HTTP server on %s\n", httpSrv.Addr)
	if err := httpSrv.ListenAndServe(); err != nil {
		log.Fatalf("httpSrv.ListenAndServe() failed with %s", err)
	}
}

/* func main() {
*   mux := http.NewServeMux()
*   mux.HandleFunc("/", rootHandler)
*
*   // Even if ":http" is omitted, a port will be set as 80
*   if err := http.ListenAndServe(":http", mux); err != nil {
	*     panic(err)
	*   }
	* } */
