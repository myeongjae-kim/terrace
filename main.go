package main

// Command-line options:
//   -production : enables HTTPS on port 443
//   -redirect-to-https : redirect HTTP to HTTTPS

import (
	"flag"
	"log"
	"net/http"
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
	mux.HandleFunc("/", rootHandler)
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

func main() {
	parseFlags()
	var m *autocert.Manager

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
