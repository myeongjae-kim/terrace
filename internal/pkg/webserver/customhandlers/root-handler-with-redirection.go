package customhandlers

import (
	"io/ioutil"
	"log"
	"net/http"

	"github.com/myeongjae-kim/go-https-boilerplate/pkg/webserver/handlers/headers"
)

var root = "./website/"

// RootHandlerWithRedirection is an handler to send static files.
//When a requested path is not found, redirect to '/404'
func RootHandlerWithRedirection(w http.ResponseWriter, r *http.Request) {
	filePath := r.URL.Path[len("/"):]

	source, err := ioutil.ReadFile(root + filePath)
	if err != nil {
		source, err = ioutil.ReadFile(root + filePath + "/index.html")
		if err != nil {
			http.Redirect(w, r, "/404", http.StatusMovedPermanently)
			return
		}
		filePath += "index.html"
	}

	// Set response headers
	headers.SetDefaultHeaders(w)
	headers.SetContentTypeHeader(w, filePath)

	// Send the response
	w.Write(source)

	//TODO: Log more detailed information.
	log.Println("(rootHandler) The requested file has been sent: ", root+filePath)
}
