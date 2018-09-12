package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"
)

type FileInfo struct {
	Path string `json:"path"`
}

func getDirectoryInfo_recur(dir string, files []os.FileInfo) ([]FileInfo, error) {
	var filelist []FileInfo

	for _, file := range files {
		var f FileInfo
		f.Path = dir + "/" + file.Name()
		if file.IsDir() {

			subFilesInfo, err := ioutil.ReadDir(f.Path)
			if err != nil {
				return nil, err
			}

			subFilesInfoList, err := getDirectoryInfo_recur(f.Path, subFilesInfo)
			if err != nil {
				return nil, err
			}
			filelist = append(filelist, subFilesInfoList...)
		} else {
			// Only append a file whose extension is EXT

			// Length of a file have to be logner than extension
			if (len(file.Name()) > len(EXT)) &&
				f.Path[len(f.Path)-len(EXT):] == EXT {
				filelist = append(filelist, f)
			}
		}
	}

	return filelist, nil
}

func getDirectoryInfo(dir string, files []os.FileInfo) ([]byte, error) {
	filelist, err := getDirectoryInfo_recur(dir, files)
	if err != nil {
		return nil, err
	}
	for i := range filelist {
		// Replace local directory to web directory
		filelist[i].Path = strings.Replace(filelist[i].Path, LOCAL_DIR, WEB_DIR, 1)

		// Remove .html
		filelist[i].Path = filelist[i].Path[:len(filelist[i].Path)-len(EXT)]
	}

	b, err := json.Marshal(filelist)
	if err != nil {
		return nil, err
	}

	return b, nil
}
