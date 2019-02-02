package contents

import (
	"bytes"
	"io/ioutil"
	"log"
	"strconv"
	"strings"

	"github.com/myeongjae-kim/terrace/internal/pkg/diriteration"
)

type metadata struct {
	RelativeID int    `json:"relativeId"`
	Title      string `json:"title"`
	Path       string `json:"path"`
	Date       struct {
		Year     string `json:"year"`
		Month    string `json:"month"`
		MonthEng string `json:"monthEng"`
		Day      string `json:"day"`
		DayEng   string `json:"dayEng"`
	} `json:"date"`
}

// getHTMLPaths returns an array of html file paths under 'contentsRoot'
func getHTMLPaths() []string {
	var HTMLFiles []string

	diriteration.DirectoryRecursiveIteration(contentsRoot, func(path string) {
		if (len(path) > len(extHTML)) &&
			path[len(path)-len(extHTML):] == extHTML {
			HTMLFiles = append(HTMLFiles, path)
			//!strings.Contains(path, "/aA"
		}
	})

	// Reverse the order of HTMLFiles to show the list from newest to oldest
	for i, j := 0, len(HTMLFiles)-1; i < j; i, j = i+1, j-1 {
		HTMLFiles[i], HTMLFiles[j] = HTMLFiles[j], HTMLFiles[i]
	}

	return HTMLFiles
}

// getMetadata returns an object of 'metadata' generated from 'HTMLArticlePath'
func getMetadata(HTMLArticlePath string) metadata {
	var metadata metadata

	article, err := ioutil.ReadFile(HTMLArticlePath)
	if err != nil {
		log.Fatal(err)
	}

	// Get title from h1 tag
	from := bytes.Index(article, []byte(">"))
	from += len(">")
	to := bytes.Index(article, []byte("</h1>"))

	if from < 0 || to < 0 {
		// There are no h1 tags, use filename as a title.
		// It means that an article that does not have <h1> will have the title
		// contains .html in the blog main page
		tokens := strings.Split(HTMLArticlePath, "/")
		metadata.Title = tokens[len(tokens)-1]
	} else {
		metadata.Title = string(article[from:to])
	}

	// Get other metadata
	metadata.Path = HTMLArticlePath

	// Replace local directory to web directory
	metadata.Path = strings.Replace(metadata.Path, contentsRoot, webRoot, 1)
	// Remove .html and add trailing slash
	metadata.Path = metadata.Path[:len(metadata.Path)-len(extHTML)] + "/"

	// Get date from path
	date := strings.Split(dateRegexEngine.FindString(metadata.Path), "/")
	metadata.Date.Year = date[0]
	metadata.Date.Month = date[1]
	metadata.Date.Day = date[2]

	// Get english date
	n, err := strconv.Atoi(date[1])
	if err != nil {
		log.Fatal(err)
	}
	metadata.Date.MonthEng = months[n]

	n, err = strconv.Atoi(date[2])
	if err != nil {
		log.Fatal(err)
	}

	metadata.Date.DayEng = dates[n]

	return metadata
}

// generateIndex returns a slice of metadata
func generateIndex() []metadata {
	var metadataSlice []metadata

	HTMLPaths := getHTMLPaths()

	for i, HTMLPath := range HTMLPaths {
		metadata := getMetadata(HTMLPath)
		metadata.RelativeID = i

		metadataSlice = append(metadataSlice, metadata)
	}

	return metadataSlice
}

// GenerateAndInjectIndexToBlogComponent , Is there more needed explanations?
func GenerateAndInjectIndexToBlogComponent() {
	index := generateIndex()
	injectObjectAsJSON(blogComponentPath, index)
}
