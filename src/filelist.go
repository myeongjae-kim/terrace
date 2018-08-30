package main

import (
	"io/ioutil"
	"os"
)

type FileInfo struct {
	Name   string
	IsDir  bool
	SubDir []FileInfo
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

	// TODO: make the return as a json string

	return GetStringOfFileInfo(dir, filelist), nil
}
