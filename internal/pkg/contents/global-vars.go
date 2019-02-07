package contents

import "regexp"

const (
	// blogContentsRoot is a path of root directory which has blog contents
	blogContentsRoot   = "./web/home/public/blog_contents"
	dailyContentsRoot  = "./web/home/public/daily_contents"
	vueConfigPath      = "./web/home/vue.config.js"
	blogComponentPath  = "./web/home/src/components/Blog.vue"
	dailyComponentPath = "./web/home/src/components/Daily.vue"

	extHTML = ".html"
	extMD   = ".md"

	blogRoot  = "/blog"
	dailyRoot = "/daily"

	outputFilePath = blogContentsRoot + "/index.json"

	injectPosition = "INJECT_POSITION"
)

var (
	dateRegexEngine = regexp.MustCompile(
		`([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))`)

	months = [13]string{"",
		"January", "February", "March",
		"April", "May", "June",
		"July", "August", "September",
		"October", "November", "December",
	}

	dates = [32]string{"",
		"1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
		"11st", "12nd", "13rd", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
		"21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th",
		"31st",
	}
)