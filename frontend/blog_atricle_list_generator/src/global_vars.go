package main

const LOCAL_DIR string = "../home/public/blog_contents"
const WEB_DIR string = "/#/blog"
const EXT string = ".html"
const OUTPUT_FILE string = LOCAL_DIR + "/index.json"

var MONTHS [13]string = [13]string{"",
	"January", "February", "March",
	"April", "May", "June",
	"July", "August", "September",
	"October", "November", "December",
}
var DATES [32]string = [32]string{"",
	"1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
	"11st", "12nd", "13rd", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
	"21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th",
	"31st",
}
