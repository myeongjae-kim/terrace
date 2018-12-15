package main

import (
	"io"
	"log"
	"os"
)

// Command-line options:
//   -production : enables HTTPS on port 443
//   -redirect-to-https : redirect HTTP to HTTTPS

func main() {
	// Set Logger
	f, err := os.OpenFile("log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	mw := io.MultiWriter(os.Stdout, f)
	log.SetOutput(mw)
	log.Println("Logger is ready.")

	m := make(HandlerMap)
	m["/"] = rootHandler
	m["/line_notify"] = lineNotifyHandler

	allowedHosts := []string{
		"live.myeongjae.kim",
		"book.myeongjae.kim",
	}

	parseFlags()
	httpSrv, httpsSrv := setServers(m, allowedHosts)
	if httpSrv == nil {
		log.Fatalln("(main) http server cannot be ready to run.")
	}

	if httpsSrv != nil {
		go func() {
			log.Printf("Starting HTTPS server on %s\n", httpsSrv.Addr)
			if err := httpsSrv.ListenAndServeTLS("", ""); err != nil {
				log.Fatalf("httpsSrv.ListenAndServeTLS() failed with %s", err)
			}
		}()
	}

	log.Printf("Starting HTTP server on %s\n", httpSrv.Addr)
	if err := httpSrv.ListenAndServe(); err != nil {
		log.Fatalf("httpSrv.ListenAndServe() failed with %s", err)
	}
}
