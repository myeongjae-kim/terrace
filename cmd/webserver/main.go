package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/myeongjae-kim/go-https-boilerplate/pkg/logger"
	"github.com/myeongjae-kim/go-https-boilerplate/pkg/webserver"
	"github.com/myeongjae-kim/go-https-boilerplate/pkg/webserver/handlers"

	"github.com/myeongjae-kim/terrace/internal/pkg/webserver/customhandlers"
)

var (
	flagRedirectToHTTPS bool
	flagHTTPSPort       int
	flagHTTPPort        int
	flagRootDirectory   string
)

func setArgumentOptions() {
	flag.BoolVar(
		&flagRedirectToHTTPS,
		"redirect-to-https",
		false,
		"if true, we redirect HTTP to HTTPS",
	)

	flag.IntVar(
		&flagHTTPSPort,
		"https-port",
		443,
		"Set its value to https port number. Default value is 443",
	)

	flag.IntVar(
		&flagHTTPPort,
		"http-port",
		80,
		"Set its value to http port number. Default value is 80",
	)

	flag.StringVar(
		&flagRootDirectory,
		"web-root-directory",
		"DEFAULT",
		"Set its value as root directory of a web server. Default value is './website'",
	)

	flag.Parse()

	if flagRedirectToHTTPS {
		log.Println("flagRedirectToHTTPS is set.")
	}

	webserver.SetRedirectToHTTPS(flagRedirectToHTTPS)
	webserver.SetHTTPSPort(flagHTTPSPort)
	webserver.SetHTTPPort(flagHTTPPort)

	if flagRootDirectory != "DEFAULT" {
		handlers.SetRootDirectory(flagRootDirectory)
	}
}

func main() {
	logFile, err := logger.InitLoggerWithLogFileName("log")
	if err != nil {
		log.Fatalln(err.Error())
	}
	defer logFile.Close()

	setArgumentOptions()

	// Set handlers
	handlerMap := make(webserver.HandlerMap)
	handlerMap["/"] = customhandlers.RootHandlerWithRedirection
	handlerMap["book.myeongjae.kim/"] = func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://live.myeongjae.kim:5470", http.StatusMovedPermanently)
		log.Println("Redirect to https://live.myeongjae.kim:5470")

		/*
			log.Println("Request URL:", r.URL)
			log.Println("Request Header:", r.Header)

			// Client객체에서 Request 실행
			r.URL.Scheme = "https"
			r.URL.Host = "live.myeongjae.kim:5470"
			r.RequestURI = ""
			client := &http.Client{}
			resp, err := client.Do(r)
			if err != nil {
				panic(err)
			}
			defer resp.Body.Close()

			// Response 체크.
			respBody, err := ioutil.ReadAll(resp.Body)
			// Copy headers
			responseHeader := w.Header()
			for key, values := range resp.Header {
				for _, value := range values {
					responseHeader.Add(key, value)
				}
			}

			w.Write(respBody)
			log.Println("Response Header:", w.Header())
		*/
	}
	handlerMap["/line_notify"] = customhandlers.LineNotifyHandler

	// Set HTTPS hosts
	allowedHTTPSHosts := []string{
		"live.myeongjae.kim",
		"book.myeongjae.kim",
	}

	webserver.InitAndRunServers(handlerMap, allowedHTTPSHosts)
}
