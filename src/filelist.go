package main

import (
	"encoding/json"
	"io/ioutil"
	"os"
)

type FileInfo struct {
	Name   string     `json:"name"`
	IsDir  bool       `json:"isDir"`
	SubDir []FileInfo `json:"subDir"`
}

func GetStringOfFileInfo(prefix string, files []FileInfo) string {
	var s string

	for _, file := range files {
		s += prefix + "/" + file.Name
		if file.IsDir {
			s += "/\n"
			s += GetStringOfFileInfo(prefix+"/"+file.Name, file.SubDir)
		} else {
			s += "\n"
		}
	}

	return s
}

func AddPrefix(prefix string, files []FileInfo) []FileInfo {
	var s string

	for idx, _ := range files {
		s = prefix + "/" + files[idx].Name
		if files[idx].IsDir {
			s += "/"
			files[idx].SubDir = AddPrefix(prefix+"/"+files[idx].Name, files[idx].SubDir)
		}
		files[idx].Name = s
	}

	return files
}

func getDirectoryInfo_recur(dir string, files []os.FileInfo) ([]FileInfo, error) {
	var filelist []FileInfo

	for _, file := range files {
		var f FileInfo
		f.Name = file.Name()
		if f.IsDir = file.IsDir(); f.IsDir {

			subFilesInfo, err := ioutil.ReadDir(dir + "/" + f.Name)
			if err != nil {
				return nil, err
			}

			f.SubDir, err = getDirectoryInfo_recur(dir+"/"+f.Name, subFilesInfo)
			if err != nil {
				return nil, err
			}
		}

		filelist = append(filelist, f)
	}

	return filelist, nil
}

func getDirectoryInfo(dir string, files []os.FileInfo) (string, error) {
	filelist, err := getDirectoryInfo_recur(dir, files)
	if err != nil {
		return "", err
	}

	filelist = AddPrefix(dir, filelist)

	// TODO: make the return as a json string
	b, err := json.Marshal(filelist)
	if err != nil {
		return "", err
	}

	return string(b), nil
}
