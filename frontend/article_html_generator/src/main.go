package main

import (
	"io/ioutil"
	"log"
)

func main() {
	dirInfo, err := ioutil.ReadDir(LOCAL_DIR)
	if err != nil {
		log.Println("(main) ", err)
		return
	}
	err = generateHtmlFromMarkdown(LOCAL_DIR, dirInfo)
	if err != nil {
		log.Println("(main) ", err)
		return
	}
}
