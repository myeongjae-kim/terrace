package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

func main() {
	dirInfo, err := ioutil.ReadDir(LOCAL_DIR)
	if err != nil {
		log.Println("(main) ", err)
		return
	}

	s, err := getDirectoryInfo(LOCAL_DIR, dirInfo)
	if err != nil {
		log.Println("(main) ", err)
		return
	}

	// At least indexJson have to have an empty array
	if string(s) == "null" {
		s = s[:0]
		s = append(s, "[]"...)
	}

	// The created json will be injected to Blog.vue file.
	injectToVueConfig(s)

	prettyS, _ := prettyprint(s)

	fmt.Println(string(prettyS))
	log.Println("List of pages which have to be pre-rendered is saved to vue.config.js")
}

func prettyprint(b []byte) ([]byte, error) {
	var out bytes.Buffer
	err := json.Indent(&out, b, "", "  ")
	return out.Bytes(), err
}
