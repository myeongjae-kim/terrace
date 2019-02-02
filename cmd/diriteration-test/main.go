package main

import (
	"log"

	"github.com/myeongjae-kim/terrace/internal/pkg/diriteration"
)

// On the root of the project, execute "go run cmd/diriteration-test/main.go"
func main() {
	diriteration.DirectoryRecursiveIteration("./web/home/public/blog_contents", func(s string) {
		log.Println(s)
	})
}
