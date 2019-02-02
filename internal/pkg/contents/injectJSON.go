package contents

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"strings"
)

// injectJSON injects json to a file of the targetPath.
//The target file must have strings of __INSERTION_POSITION__ and __INSERTION_POSITION_END__
//There must be ONLY SINGLE array between above two strings.
//A generated json will be inject to the array.
func injectObjectAsJSON(targetPath string, obj interface{}) {
	jsonBytes, err := prettyprint(convertObjectToJSON(obj))
	if err != nil {
		log.Fatal(err)
	}

	json := string(jsonBytes)

	targetFileBytes, err := ioutil.ReadFile(targetPath)
	if err != nil {
		log.Fatal(err)
	}

	targetFile := string(targetFileBytes)

	i := strings.Index(targetFile, "__INSERTION_POSITION__")

	from := strings.Index(targetFile[i:], "[")
	from += i

	k := strings.Index(targetFile, "__INSERTION_POSITION_END__")
	to := strings.LastIndex(targetFile[i:k+2], "]")
	to += i

	targetFile = targetFile[0:from] + json + targetFile[to+1:]

	err = ioutil.WriteFile(targetPath, []byte(targetFile), 0644)
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("(injectObjAsJSON) Succeeded to inject an object to the target file '%s'.", targetPath)
}

func prettyprint(b []byte) ([]byte, error) {
	var out bytes.Buffer
	err := json.Indent(&out, b, "", "  ")
	return out.Bytes(), err
}

func convertObjectToJSON(obj interface{}) []byte {
	b, err := json.Marshal(obj)
	if err != nil {
		log.Fatal(err)
	}
	return b
}
