package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
)

const (
	EXT_HTML string = ".html"
	EXT_MD   string = ".md"
)

var articles []string

func execRmOldHtml(path string) {
	if (len(path) > len(EXT_HTML)) &&
		path[len(path)-len(EXT_HTML):] == EXT_HTML {

		cmd := exec.Command("rm", path)
		// cmd := exec.Command("pwd")
		var out bytes.Buffer
		cmd.Stdout = &out
		err := cmd.Run()
		if err != nil {
			log.Fatal(err)
		}
		//log.Printf("pandoc output: %q\n", out.String())
		log.Printf("deleted html document: %q\n", path)
	}
}

func execPandocMdToHtml(path string) {
	// Length of a file have to be logner than extension
	if (len(path) > len(EXT_MD)) &&
		path[len(path)-len(EXT_MD):] == EXT_MD {

		result := path[0:len(path)-len(EXT_MD)] + EXT_HTML

		cmd := exec.Command(
			"pandoc",
			path,
			"-o",
			result,
			"--to",
			"html5",
			"--no-highlight",
		)
		// cmd := exec.Command("pwd")
		var out bytes.Buffer
		cmd.Stdout = &out
		err := cmd.Run()
		if err != nil {
			log.Fatal(err)
		}
		//log.Printf("pandoc output: %q\n", out.String())

		articles = append(articles, path[0:len(path)-len(EXT_MD)]+EXT_HTML)

		log.Printf("generated document: %q\n", result)
	}
}

func iterate(path string, dirInfo []os.FileInfo) {
	for _, info := range dirInfo {
		absolutePathName := path + "/" + info.Name()

		if info.IsDir() {
			subDirInfo, err := ioutil.ReadDir(absolutePathName)
			if err != nil {
				log.Println("(iterate) ", err)
				log.Fatal(err)
			}
			iterate(absolutePathName, subDirInfo)
		} else {
			execRmOldHtml(absolutePathName)
			execPandocMdToHtml(absolutePathName)
		}
		fmt.Println(info.Name())
	}
}

func main() {
	localDir := "."

	dirInfo, err := ioutil.ReadDir(localDir)
	if err != nil {
		log.Println("(main) ", err)
		log.Fatal(err)
	}
	iterate(localDir, dirInfo)

	fmt.Println("\n\n articles \n\n")
	for _, article := range articles {
		fmt.Println(article)
	}

	// Reverse articles' order
	i := 0
	k := len(articles) - 1
	for {
		articles[i], articles[k] = articles[k], articles[i]

		i++
		k--
		if i >= k {
			break
		}
	}

	b, err := json.Marshal(articles)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("\n\n json \n\n")
	fmt.Println(string(b))
}
