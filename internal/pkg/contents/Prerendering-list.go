package contents

// GenerateAndInjectPrerenderingListToVueConfig , Is there more needed explanations?
func GenerateAndInjectPrerenderingListToVueConfig() {
	list := []string{
		"/",
		"/blog/",
		"/musings/",
		"/places/",
		"/blog-example/",
		"/404/",
	}

	index := generateIndex()
	for _, metadata := range index {
		list = append(list, metadata.Path)
	}

	injectObjectAsJSON(vueConfigPath, list)
}
