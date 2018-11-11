package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"strconv"
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

type lineNotifyResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func lineNotifyHandler(w http.ResponseWriter, r *http.Request) {
	log.Println(r.Method)
	if r.Method == "POST" {

	} else {
		w.WriteHeader(403)
		w.Write([]byte("403 Bad Request"))
		return
	}

	data := url.Values{}
	data.Set("message", "\n안녕하세요, 점심뭐먹지 봇입니다.\n이제 점심 메뉴를 골라드릴 수 있겠네요 😀")

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

	var lineResponse lineNotifyResponse
	marsErr := json.Unmarshal(respBody, &lineResponse)
	log.Println("marsErr: ", marsErr)
	log.Println("response status: ", lineResponse)

	if err == nil {
		w.WriteHeader(200)
		str := "<html><script language='JavaScript'>"
		if lineResponse.Status != 200 {
			str += "alert('" + strconv.Itoa(lineResponse.Status) + " : " + lineResponse.Message + "');"
		}
		str += "window.open('','_self').close();</script></html>"
		w.Write([]byte(str))
		log.Println("(lineNotifyHandler)", str)
	} else {
		w.Write([]byte(err.Error()))
		w.WriteHeader(400)
		log.Println("(lineNotifyHandler) Error: ", err)
	}
	return
}
