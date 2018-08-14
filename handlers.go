package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

func rootHandler(w http.ResponseWriter, r *http.Request) {
	// when request is root, send index.html
	// otherwise, send the file

	path := r.URL.Path[len("/"):]

	if path == "" {
		// log.Println("(rootHandler) The Main page access has been occurred.")

		source, err := ioutil.ReadFile("./web_root/index.html")
		if err != nil {
			http.Error(w, err.Error(), 500)
			// log.Println("(rootHandler) ", err)
			return
		}
		fmt.Fprint(w, string(source))

	} else {
		// send requested file
		source, err := ioutil.ReadFile("./web_root/" + path)
		if err != nil {
			http.Error(w, err.Error(), 500)
			// log.Println("(rootHandler) ", err)
			return
		}

		// Set content type as css if required file's extension is css
		if len(path) >= 4 && path[len(path)-4:] == ".css" {
			w.Header().Set("Content-Type", "text/css")
		}

		fmt.Fprint(w, string(source))
		// log.Println("(handler) The requested file has been sent: ", filename)
	}
}
