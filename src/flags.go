package main

import (
	"flag"
	"log"
)

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
