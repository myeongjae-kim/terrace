package main

import (
	"fmt"
	"io/ioutil"
	"log"
)

func main() {
	dirInfo, err := ioutil.ReadDir(LOCAL_DIR)
	if err != nil {
		log.Println("(main) ", err)
		log.Fatal(err)
	}

	err = removeOldHtml(LOCAL_DIR, dirInfo)
	if err != nil {
		log.Println("(main) ", err)
		log.Fatal(err)
	}

	err = generateHtmlFromMarkdown(LOCAL_DIR, dirInfo)
	if err != nil {
		log.Println("(main) ", err)
		log.Fatal(err)
	}

	fmt.Println("\n*** Not published articles ***")
	for _, i := range articlesNotPublished {
		fmt.Println(i)
	}
}
