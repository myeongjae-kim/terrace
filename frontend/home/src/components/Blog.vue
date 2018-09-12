<template>
  <div id="blog">
    <div id="blog-main" v-if="year == undefined">
      <p>(Under development)</p>
      <h1>Articles</h1>
      <!-- Show titles of blog contents -->
      <div id="blog-article-list" v-for="i in index" :key="i.path">
        <p><a :href="i.path">{{ i.title }}</a>
        <!-- <br>{{ i.date.monthEng }} {{ i.date.dayEng }}, {{ i.date.year }}</p> -->
        <br>{{ i.date.year }} / {{ i.date.month }} / {{ i.date.day }}</p>
      </div>
    </div>
    <div id="blog-contents" v-else>
      <div class="blog-title" v-show="isTitleShown">
        <h1>{{ title }}</h1>
        <p class="meta">{{ year }} / {{ month }} / {{ day }}</p>
        <!-- Loader start -->
        <div id="loader" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <!-- Loader end -->
      </div>
			<div id="articleID" v-html="article"></div>
      <p>{{ address }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  mounted: function() {
		this.getPage();
	},
  updated: function() {
    // Change file name to document's title
    // When the page is an artice page, get blogContents
    var blogContents = document.querySelector('#blog-contents');
    if(blogContents == null){
      this.isTitleShown = true;
      return;
    }

    // Find all h1 tags, and choose second h1. It is real title of this doc.
    var titles = blogContents.querySelectorAll('h1');
    if(titles.length <= 1) {
      this.isTitleShown = true;
      return;
    }

    this.title = titles[1].innerHTML;
    titles[1].remove();
    this.isTitleShown = true;

    // add class 'router-link-exact-active' to the blog nav
    var nav_blog = document.querySelector('nav');

    var is_blog_found = false;
    [].forEach.call(nav_blog.querySelectorAll('a'), function(el) {
      // return immediately when target is found and updated.
      if(is_blog_found) return;

      // Add ' router-link-exact-active' to the class attribute.
      if(el.getAttribute('href') == "#/blog") {
        el.setAttribute(
          'class',
          el.getAttribute('class') + ' router-link-exact-active'
        );
        is_blog_found = true;
      }
    });

  },
	data() {
		return {
			year: this.$route.params.year,
			month: this.$route.params.month,
			day: this.$route.params.day,
			title: this.$route.params.title,
			article: "",   // will contain contents' html. 
      address : "",  // will have a permalink of the article

      // INJECT_POSITION DO NOT MODIFY THIS LINE!
      // The first json array after this line is
      // the position of injecting index json. index MUST have an array.
      index :  [{"title":"This is test document2","path":"/#/blog/2018/09/11/this-is-test-document2","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"This is test document1","path":"/#/blog/2018/09/11/this-is-test-document1","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"테스트 3","path":"/#/blog/2018/09/11/test-3","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"temp.html","path":"/#/blog/2018/09/10/temp","date":{"year":"2018","month":"09","monthEng":"September","day":"10","dayEng":"10th"}}],
      isTitleShown : false,
		}
	},
  watch: {
    '$route' (to) {
			this.year = to.params.year;
			this.month = to.params.month;
			this.day = to.params.day;
			this.title = to.params.title;
			this.getPage();
    }
	},
	methods: {
		getPage: function() {
			if(this.year == undefined) return;

      // Hide title. This title is shown after it is modified.
      this.isTitleShown = false;

			this.address =
        '/blog_contents/'
        + this.year + '/'
        + this.month + '/'
        + this.day + '/'
        + this.title + '.html';

			var vue = this;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", this.address, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
          var str = xhr.responseText.substring(0,4);
          if(str == "<!DO" || str == "<hea") {
						window.location.href = "/#/404";
					} else {
						vue.article = xhr.responseText;

            // After loading the document, address variable will be
            // a permalink of this article.
            vue.address = 
              'https://blog.myeongjae.kim'
              + vue.address.replace('blog_contents/', '')
                           .replace('.html', '');

            // hideContentLoader
            document.querySelector('#loader').remove();
					}
				}
			};
			xhr.send();
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-contents {
  text-align: left;
}

.blog-title {
  text-align: center;
}

.blog-title > h1 {
  margin-bottom: 0;
}

.meta {
  margin: 0;
}

div#blog {
  min-height: 300px;
}

div.waiting {
  background-color: gray;
}

.hidden {
  display:none !important;
}

/* below CSS si for a loader */
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
  padding: 15px;
}
.lds-spinner div {
  transform-origin: 32px 32px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 29px;
  width: 5px;
  height: 14px;
  border-radius: 20%;
  background: #000;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
