package diriteration

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

func Example() {
	path := "example-dir"

	os.Mkdir(path, 0755)
	ioutil.WriteFile(path+"/file", []byte{}, 0644)

	os.Mkdir(path+"/1", 0755)
	ioutil.WriteFile(path+"/1/file", []byte{}, 0644)
	os.Mkdir(path+"/1/first", 0755)
	ioutil.WriteFile(path+"/1/first/file", []byte{}, 0644)
	os.Mkdir(path+"/1/first/one", 0755)
	ioutil.WriteFile(path+"/1/first/one/file", []byte{}, 0644)
	os.Mkdir(path+"/1/second", 0755)
	ioutil.WriteFile(path+"/1/second/file", []byte{}, 0644)

	os.Mkdir(path+"/2", 0755)
	ioutil.WriteFile(path+"/2/file", []byte{}, 0644)
	os.Mkdir(path+"/2/first", 0755)
	ioutil.WriteFile(path+"/2/first/", []byte{}, 0644)

	err := DirectoryRecursiveIteration(path, func(arg string) {
		fmt.Println(arg)
	})
	if err != nil {
		log.Println(err.Error())
	}

	os.RemoveAll(path)
	// Output:
	// example-dir/1/file
	// example-dir/1/first/file
	// example-dir/1/first/one/file
	// example-dir/1/second/file
	// example-dir/2/file
	// example-dir/file
}
