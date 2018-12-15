package main

import (
	"io"
	"log"
	"os"
)

// Command-line options:
//   -production : enables HTTPS on port 443
//   -redirect-to-https : redirect HTTP to HTTTPS

func main() {
	// Set Logger
	f, err := os.OpenFile("log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	mw := io.MultiWriter(os.Stdout, f)
	log.SetOutput(mw)
	log.Println("Logger is ready.")

	m := make(HandlerMap)
	m["/"] = rootHandler
	m["/line_notify"] = lineNotifyHandler

	parseFlags()
	runServers(m)
}
