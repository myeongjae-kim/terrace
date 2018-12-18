package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/hrzon/go-https-boilerplate/pkg/logger"
	"github.com/hrzon/go-https-boilerplate/pkg/webserver"
	"github.com/hrzon/go-https-boilerplate/pkg/webserver/handlers"

	"github.com/hrzon/terrace/internal/pkg/webserver/customhandlers"
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
		"./web",
		"Set its value as root directory of a web server. Default value is './web'",
	)

	flag.Parse()

	if flagRedirectToHTTPS {
		log.Println("flagRedirectToHTTPS is set.")
	}

	webserver.SetRedirectToHTTPS(flagRedirectToHTTPS)
	webserver.SetHTTPSPort(flagHTTPSPort)
	webserver.SetHTTPPort(flagHTTPPort)
	handlers.SetRootDirectory(flagRootDirectory)
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
	handlerMap["/"] = handlers.RootHandler
	handlerMap["book.myeongjae.kim/"] = func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("<html><meta http-equiv='refresh' content='0; url=https://live.myeongjae.kim:1334'></meta></html>"))
		log.Println("Redirect to https://live.myeongjae.kim:1334")
	}
	handlerMap["/line_notify"] = customhandlers.LineNotifyHandler

	// Set HTTPS hosts
	allowedHTTPSHosts := []string{
		"live.myeongjae.kim",
		"book.myeongjae.kim",
	}

	webserver.InitAndRunServers(handlerMap, allowedHTTPSHosts)
}
