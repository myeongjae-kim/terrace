package contents

// GenerateAndInjectPrerenderingListToVueConfig , Is there more needed explanations?
func GenerateAndInjectPrerenderingListToVueConfig() {
	list := []string{
		"/",
		"/blog/",
		"/daily/",
		"/musings/",
		"/places/",
		"/blog-example/",
		"/404/",
	}

	index := generateIndex(blogContentsRoot, blogRoot)
	for _, metadata := range index {
		list = append(list, metadata.Path)
	}

	index = generateIndex(dailyContentsRoot, dailyRoot)
	for _, metadata := range index {
		list = append(list, metadata.Path)
	}

	injectObjectAsJSON(vueConfigPath, list)
}
