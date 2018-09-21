package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func sampleHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, world!")
}

func rootHandler(w http.ResponseWriter, r *http.Request) {
	// when request is root, send index.html
	// otherwise, send the file

	log.Println(r.URL.Path)

	path := r.URL.Path[len("/"):]

	source, err := ioutil.ReadFile(WebRoot + path)
	if err != nil {
		source, err = ioutil.ReadFile(WebRoot + path + "/index.html")
		if err != nil {
			// Redirect to 404 page
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprint(w, "<head><meta http-equiv='refresh' content='0;url=/#/404'/></head>")
			log.Println("(rootHandler) ", err)
			return
		}
	}

	// Set content type as css if required file's extension is css
	if len(path) >= 4 && path[len(path)-4:] == ".css" {
		w.Header().Set("Content-Type", "text/css")
	}

	fmt.Fprint(w, string(source))
	log.Println("(rootHandler) The requested file has been sent: ", WebRoot+path)
}
