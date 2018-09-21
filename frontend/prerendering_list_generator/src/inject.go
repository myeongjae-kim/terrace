package main

import (
	"bytes"
	"io/ioutil"
	"log"
)

func injectToVueConfig(indexJSON []byte) error {
	vueBlog, err := ioutil.ReadFile(VUE_CONFIG_PATH)
	if err != nil {
		log.Println("(inject) ", err)
		return err
	}

	i := bytes.Index(vueBlog, []byte(INJECT_POSITION))

	// Find the first " or '
	from := bytes.IndexAny(vueBlog[i:], "[")
	from += i

	cnt := 1
	to := from + 1
	for cnt > 0 {
		if vueBlog[to] == '[' {
			cnt++
		} else if vueBlog[to] == ']' {
			cnt--
		}
		to++
	}

	// to := bytes.IndexAny(vueBlog[from+1:], "]")
	// to += from + 1

	// log.Println(string(vueBlog[from : to+1]))

	// Remove contents and add new json
	modified := make([]byte, len(vueBlog[0:from]))
	copy(modified, vueBlog[0:from])
	modified = append(modified, indexJSON...)
	modified = append(modified, vueBlog[to:]...)

	// Write the modified vue component
	err = ioutil.WriteFile(VUE_CONFIG_PATH, modified, 0644)
	if err != nil {
		log.Println("(main) ", err)
		return err
	}

	// log.Println(string(modified))
	return nil
}
