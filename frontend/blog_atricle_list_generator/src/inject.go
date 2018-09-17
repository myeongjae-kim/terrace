package main

import (
	"bytes"
	"io/ioutil"
	"log"
)

func injectToBlogComponent(indexJson []byte) error {
	blogVue, err := ioutil.ReadFile(BLOG_VUE_PATH)
	if err != nil {
		log.Println("(inject) ", err)
		return err
	}

	i := bytes.Index(blogVue, []byte(INJECT_POSITION))

	// Find the first " or '
	from := bytes.IndexAny(blogVue[i:], "[")
	from += i

	cnt := 1
	to := from + 1
	for cnt > 0 {
		if blogVue[to] == '[' {
			cnt++
		} else if blogVue[to] == ']' {
			cnt--
		}
		to++
	}

	// to := bytes.IndexAny(blogVue[from+1:], "]")
	// to += from + 1

	// log.Println(string(blogVue[from : to+1]))

	// Remove contents and add new json
	modified := make([]byte, len(blogVue[0:from]))
	copy(modified, blogVue[0:from])
	modified = append(modified, indexJson...)
	modified = append(modified, blogVue[to:]...)

	// Write the modified vue component
	err = ioutil.WriteFile(BLOG_VUE_PATH, modified, 0644)
	if err != nil {
		log.Println("(main) ", err)
		return err
	}

	// log.Println(string(modified))
	return nil
}
