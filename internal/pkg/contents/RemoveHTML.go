package contents

import (
	"log"
	"os"
)

// RemoveHTML deletes a file which is located at 'path' argument if the file's extension is ".HTML"
func RemoveHTML(path string) {
	if (len(path) > len(extHTML)) &&
		path[len(path)-len(extHTML):] == extHTML {
		os.Remove(path)
		log.Printf("deleted html document: %q\n", path)
	}
}
