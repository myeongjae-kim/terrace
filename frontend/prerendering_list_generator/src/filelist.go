package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"
)

func getDirectoryInfoRecur(dir string, files []os.FileInfo) ([]string, error) {
	var filelist []string

	for _, file := range files {
		var f string
		f = dir + "/" + file.Name()
		if file.IsDir() {

			subFilesInfo, err := ioutil.ReadDir(f)
			if err != nil {
				return nil, err
			}

			subFilesInfoList, err := getDirectoryInfoRecur(f, subFilesInfo)
			if err != nil {
				return nil, err
			}
			filelist = append(filelist, subFilesInfoList...)
		} else {
			// Only append a file whose extension is EXT

			// Length of a file have to be logner than extension
			if (len(file.Name()) > len(EXT_HTML)) &&
				f[len(f)-len(EXT_HTML):] == EXT_HTML {

				filelist = append(filelist, f)
			}
		}
	}

	return filelist, nil
}

func getDirectoryInfo(dir string, files []os.FileInfo) ([]byte, error) {
	filelist, err := getDirectoryInfoRecur(dir, files)
	if err != nil {
		return nil, err
	}

	for i := range filelist {
		// Replace local directory to web directory
		filelist[i] = strings.Replace(filelist[i], LOCAL_DIR, WEB_DIR, 1)

		// Remove .html
		filelist[i] = filelist[i][:len(filelist[i])-len(EXT_HTML)]

	}

	var s []string

	for _, f := range filelist {
		s = append(s, f)
	}

	// Get paths from a global variable.
	for _, f := range PATHS {
		s = append(s, f)
	}

	b, err := json.Marshal(s)
	if err != nil {
		return nil, err
	}

	return b, nil
}
