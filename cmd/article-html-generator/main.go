package main

import (
	"github.com/myeongjae-kim/terrace/internal/pkg/contents"
	"github.com/myeongjae-kim/terrace/internal/pkg/diriteration"
)

func main() {
	diriteration.DirectoryRecursiveIteration(contents.ContentsRoot, contents.RemoveHTML)
	diriteration.DirectoryRecursiveIteration(contents.ContentsRoot, contents.PandocMDtoHTML)
}
