package contents

import (
	"log"
	"os/exec"
	"strings"

	"github.com/myeongjae-kim/terrace/internal/pkg/diriteration"
)

// PandocMDtoHTML converts markdown files under contents root directory to html files.
func PandocMDtoHTML() {
	diriteration.DirectoryRecursiveIteration(blogContentsRoot, pandocMDtoHTML)
	diriteration.DirectoryRecursiveIteration(dailyContentsRoot, pandocMDtoHTML)
}

// pandocMDtoHTML converts markdown file located at 'path' to html file.
func pandocMDtoHTML(path string) {
	// Length of a file have to be logner than extension
	// Exclude files which contain "aA"
	if (len(path) > len(extMD)) &&
		path[len(path)-len(extMD):] == extMD &&
		!strings.Contains(path, "/aA") {

		result := path[0:len(path)-len(extMD)] + extHTML

		cmd := exec.Command(
			"pandoc",
			path,
			"-o",
			result,
			"--to",
			"html5",
			"--no-highlight",
		)
		err := cmd.Run()
		if err != nil {
			log.Fatal(err)
		}
		log.Printf("generated html document: %q\n", result)
	}
}