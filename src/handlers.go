package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strings"
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
			fmt.Fprint(w, "<head><meta http-equiv='refresh' content='0;url=/404/'/></head>")
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

func lineNotifyHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		w.WriteHeader(403)
		w.Write([]byte("403 Bad Request"))
		return
	}

	data := url.Values{}
	data.Set("message", "test messages")

	reqBody := strings.NewReader(data.Encode())

	req, err := http.NewRequest("POST", "https://notify-api.line.me/api/notify", reqBody)
	if err != nil {
		panic(err)
	}

	token := r.FormValue("token")
	log.Println("(lineNotifyHandler) Received token: ", token)

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Authorization", "Bearer "+token)

	// Client객체에서 Request 실행
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	// Response 체크.
	respBody, err := ioutil.ReadAll(resp.Body)
	if err == nil {
		str := string(respBody)
		w.Write(respBody)
		w.WriteHeader(200)
		log.Println("(lineNotifyHandler)", str)
	} else {
		w.Write([]byte("400 Bad Request"))
		w.WriteHeader(400)
		log.Println("(lineNotifyHandler)", err)
	}

	return
}
