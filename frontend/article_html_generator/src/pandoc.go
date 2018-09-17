package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
)

func convertMarkdownToHtml(path string) {
	if (len(path) > len(EXT_MD)) &&
		path[len(path)-len(EXT_MD):] == EXT_MD {

		result := path[0:len(path)-len(EXT_MD)] + EXT_HTML

		cmd := exec.Command("pandoc", path, "-o", result, "--to", "html5")
		// cmd := exec.Command("pwd")
		var out bytes.Buffer
		cmd.Stdout = &out
		err := cmd.Run()
		if err != nil {
			log.Fatal(err)
		}
		//log.Printf("pandoc output: %q\n", out.String())
		log.Printf("generated document: %q\n", result)
	}
}

func generateHtmlFromMarkdown_recur(
	dir string,
	files []os.FileInfo,
) error {

	for _, file := range files {
		var f string
		f = dir + "/" + file.Name()

		if file.IsDir() {

			subFilesInfo, err := ioutil.ReadDir(f)
			if err != nil {
				return err
			}

			err = generateHtmlFromMarkdown_recur(f, subFilesInfo)
			if err != nil {
				return err
			}
		} else {
			// Length of a file have to be logner than extension
			if (len(file.Name()) > len(EXT_MD)) &&
				f[len(f)-len(EXT_MD):] == EXT_MD {

				// Get title
				convertMarkdownToHtml(f)
			}

		}
	}

	return nil
}

func generateHtmlFromMarkdown(
	dir string,
	files []os.FileInfo,
) error {

	err := generateHtmlFromMarkdown_recur(dir, files)
	if err != nil {
		return err
	}

	return nil
}
