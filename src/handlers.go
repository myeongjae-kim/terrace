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

	path := r.URL.Path[len("/"):]

	if path == "" {
		log.Println("(rootHandler) The Main page access has been occurred.")

		source, err := ioutil.ReadFile(WEB_ROOT + "index.html")
		if err != nil {
			http.Error(w, err.Error(), 500)
			log.Println("(rootHandler) ", err)
			return
		}
		fmt.Fprint(w, string(source))

	} else {
		// send requested file
		source, err := ioutil.ReadFile(WEB_ROOT + path)
		if err != nil {
			http.Error(w, err.Error(), 500)
			log.Println("(rootHandler) ", err)
			return
		}

		// Set content type as css if required file's extension is css
		if len(path) >= 4 && path[len(path)-4:] == ".css" {
			w.Header().Set("Content-Type", "text/css")
		}

		fmt.Fprint(w, string(source))
		log.Println("(rootHandler) The requested file has been sent: ", WEB_ROOT+path)
	}
}

func filelistHandler(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path[len("/filelist/"):]
	if path == "" {
		msg := "Requsting directory structure of root is not allowed."
		http.Error(w, msg, 500)
		log.Println("(filelistHandler) ", msg)
		return
	}

	dirInfo, err := ioutil.ReadDir(WEB_ROOT + path)
	if err != nil {
		http.Error(w, err.Error(), 500)
		log.Println("(filelistHandler) ", err)
		return
	}

	s, err := getDirectoryInfo(WEB_ROOT+path, dirInfo)
	if err != nil {
		http.Error(w, err.Error(), 500)
		log.Println("(filelistHandler) ", err)
		return
	}

	fmt.Fprint(w, s)
}
