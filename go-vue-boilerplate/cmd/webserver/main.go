package main

import (
	"flag"
	"log"

	"github.com/hrzon/go-vue-boilerplate/pkg/logger"
	"github.com/hrzon/go-vue-boilerplate/pkg/webserver"
	"github.com/hrzon/go-vue-boilerplate/pkg/webserver/handlers"
)

var (
	flagRedirectToHTTPS bool
	flagHTTPSPort       int
	flagHTTPPort        int
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

	flag.Parse()

	if flagRedirectToHTTPS {
		log.Println("flagRedirectToHTTPS is set.")
	}

	webserver.SetRedirectToHTTPS(flagRedirectToHTTPS)
	webserver.SetHTTPSPort(flagHTTPSPort)
	webserver.SetHTTPPort(flagHTTPPort)
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

	// Set HTTPS hosts
	allowedHTTPSHosts := []string{
		"live.myeongjae.kim",
		"book.myeongjae.kim",
	}

	handlers.SetRootDirectory("./web/home/dist/")
	webserver.InitAndRunServers(handlerMap, allowedHTTPSHosts)
}
