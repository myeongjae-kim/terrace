package main

import "github.com/myeongjae-kim/terrace/internal/pkg/contents"

func main() {
	contents.RemoveHTML()
	contents.PandocMDtoHTML()
	contents.GenerateAndInjectIndexToBlogComponent()
	contents.GenerateAndInjectIndexToDailyComponent()
	contents.GenerateAndInjectPrerenderingListToVueConfig()
}
