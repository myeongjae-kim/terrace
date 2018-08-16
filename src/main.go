package main

// Command-line options:
//   -production : enables HTTPS on port 443
//   -redirect-to-https : redirect HTTP to HTTTPS

func main() {
	setLogger()
	parseFlags()
	runServers()
}

/* func main() {
*   mux := http.NewServeMux()
*   mux.HandleFunc("/", rootHandler)
*
*   // Even if ":http" is omitted, a port will be set as 80
*   if err := http.ListenAndServe(":http", mux); err != nil {
	*     panic(err)
	*   }
	* } */
