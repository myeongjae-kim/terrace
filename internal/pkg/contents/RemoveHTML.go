package contents

import (
	"log"
	"os"

	"github.com/myeongjae-kim/terrace/internal/pkg/diriteration"
)

// RemoveHTML deletes html files under contents root directory.
func RemoveHTML() {
	diriteration.DirectoryRecursiveIteration(blogContentsRoot, removeHTML)
	diriteration.DirectoryRecursiveIteration(dailyContentsRoot, removeHTML)
}

// removeHTML deletes a file which is located at 'path' argument if the file's extension is ".HTML"
func removeHTML(path string) {
	if (len(path) > len(extHTML)) &&
		path[len(path)-len(extHTML):] == extHTML {
		os.Remove(path)
		log.Printf("deleted html document: %q\n", path)
	}
}
