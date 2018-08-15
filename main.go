package main

import (
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", rootHandler)

	if err := http.ListenAndServe(":http", mux); err != nil {
		panic(err)
	}
}
