package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
)

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

func removeOldHtml_recur(
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

			err = removeOldHtml_recur(f, subFilesInfo)
			if err != nil {
				return err
			}
		} else {
			// Length of a file have to be logner than extension
			if (len(file.Name()) > len(EXT_HTML)) &&
				f[len(f)-len(EXT_HTML):] == EXT_HTML {

				// Get title
				execRmOldHtml(f)
			}
		}
	}

	return nil
}

func removeOldHtml(
	dir string,
	files []os.FileInfo,
) error {

	err := removeOldHtml_recur(dir, files)
	if err != nil {
		return err
	}

	return nil
}
