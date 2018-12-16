package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net/url"
	"os"
	"os/exec"
)

// rename returns decoded name
func rename(dir string, target string) string {
	decoded, err := url.QueryUnescape(target)
	if err != nil {
		log.Fatal(err.Error())
	}
	if target == decoded {
		return target
	}

	cmd := exec.Command("mv", dir+"/"+target, dir+"/"+decoded)
	log.Printf("Decoded: %s\n", dir+"/"+decoded)
	// cmd := exec.Command("pwd")
	var out bytes.Buffer
	cmd.Stdout = &out
	err = cmd.Run()
	if err != nil {
		log.Fatal(err)
	}

	return decoded
}

func renameUnicodeUriRecur(
	dir string,
	files []os.FileInfo,
) error {

	for _, file := range files {
		var f string

		encoded := file.Name()
		// If a directory or a file's name starts with '%',
		// it is an encoded unicode name. Decode it.

		f = dir + "/" + rename(dir, encoded)

		if file.IsDir() {
			subFilesInfo, err := ioutil.ReadDir(f)
			if err != nil {
				return err
			}

			err = renameUnicodeUriRecur(f, subFilesInfo)
			if err != nil {
				return err
			}
		}
	}

	return nil
}

func renameUnicodeUri(
	dir string,
	files []os.FileInfo,
) error {

	err := renameUnicodeUriRecur(dir, files)
	if err != nil {
		return err
	}

	return nil
}
