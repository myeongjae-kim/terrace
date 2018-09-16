package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"regexp"
	"strconv"
	"strings"
)

type FileInfo struct {
	Index int    `json:"index"`
	Title string `json:"title"`
	Path  string `json:"path"`
	Date  struct {
		Year     string `json:"year"`
		Month    string `json:"month"`
		MonthEng string `json:"monthEng"`
		Day      string `json:"day"`
		DayEng   string `json:"dayEng"`
	} `json:"date"`
}

func getTitleOfArticle(path string) (string, error) {
	content, err := ioutil.ReadFile(path)
	if err != nil {
		log.Println("(main) ", err)
		return "", nil
	}
	from := bytes.Index(content, []byte("<h1>"))
	to := bytes.Index(content, []byte("</h1>"))

	// There are no h1 tags, use filename as a title.
	// It means that an article that does not have <h1> will have the title
	// contains .html in the blog main page
	if from < 0 || to < 0 {
		tokens := strings.Split(path, "/")
		return tokens[len(tokens)-1], nil
	}

	from += len("<h1>")
	return string(content[from:to]), nil
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

				// Get title
				title, _ := getTitleOfArticle(f.Path)
				f.Title = title

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

	// Regex engine for getting date
	r := regexp.MustCompile(
		`([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))`)

	for i := range filelist {
		// Replace local directory to web directory
		filelist[i].Path = strings.Replace(filelist[i].Path, LOCAL_DIR, WEB_DIR, 1)

		// Remove .html
		filelist[i].Path = filelist[i].Path[:len(filelist[i].Path)-len(EXT)]

		// Get date from path
		date := strings.Split(r.FindString(filelist[i].Path), "/")
		filelist[i].Date.Year = date[0]
		filelist[i].Date.Month = date[1]
		filelist[i].Date.Day = date[2]

		// Get english date
		n, err := strconv.Atoi(date[1])
		if err != nil {
			log.Println("(getDirectoryInfo) ", err.Error)
			return nil, err
		}
		filelist[i].Date.MonthEng = MONTHS[n]

		n, err = strconv.Atoi(date[2])
		if err != nil {
			log.Println("(getDirectoryInfo) ", err.Error)
			return nil, err
		}

		filelist[i].Date.DayEng = DATES[n]
	}

	// Reverse the order of filelist to show the list from newest to oldest
	for i, j := 0, len(filelist)-1; i < j; i, j = i+1, j-1 {
		filelist[i], filelist[j] = filelist[j], filelist[i]
	}

	for i, _ := range filelist {
		filelist[i].Index = i
	}

	b, err := json.Marshal(filelist)
	if err != nil {
		return nil, err
	}

	return b, nil
}
