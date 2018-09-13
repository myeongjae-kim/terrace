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
      </div>
			<div id="articleID" v-html="article"></div>
      <p>{{ address }}</p>
      <div id="disqus_thread"></div>
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

    // Now, below scripts are for displaying an article,
    // not the blog main page which has lists of name of articles.

    // Find all h1 tags, and choose second h1. It is real title of this doc.
    var titles = blogContents.querySelectorAll('h1');
    if(titles.length <= 1) {
      this.isTitleShown = true;
      return;
    }
    this.title = titles[1].innerHTML;
    titles[1].remove();
    this.isTitleShown = true;
    
    // Enable disqus
    this.enableDisqus(
      'myeongjae',
      this.address.replace(this.domain, ""), // uri as an identifier
      this.title,
      this.address
    );

    // add class 'router-link-exact-active' to the blog nav
    var nav_blog = document.querySelector('nav');

    var isClassAdded = false;
    [].forEach.call(nav_blog.querySelectorAll('a'), function(el) {
      // return immediately when target is found and updated.
      if(isClassAdded) return;

      // Add ' router-link-exact-active' to the class attribute.
      if(el.getAttribute('href') == "#/blog") {
        el.setAttribute(
          'class',
          el.getAttribute('class') + ' router-link-exact-active'
        );
        isClassAdded = true;
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
      domain : "https://blog.myeongjae.kim",

      // INJECT_POSITION DO NOT MODIFY THIS LINE!
      // The first json array after this line is
      // the position of injecting index json. index MUST have an array.
      index :  [{"title":" 디스쿠스 테스용 아티클입니다.","path":"/#/blog/2018/09/14/disqus-test","date":{"year":"2018","month":"09","monthEng":"September","day":"14","dayEng":"14th"}},{"title":"This is test document2","path":"/#/blog/2018/09/11/this-is-test-document2","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"This is test document1","path":"/#/blog/2018/09/11/this-is-test-document1","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"테스트 3","path":"/#/blog/2018/09/11/test-3","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"temp.html","path":"/#/blog/2018/09/10/temp","date":{"year":"2018","month":"09","monthEng":"September","day":"10","dayEng":"10th"}}],
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
    // Below function is from https://solidfoundationwebdev.com/blog/posts/many-disqus-modules-on-a-single-page
    enableDisqus: function(shortname, uri, title, url) {
console.log("enableDisqus");
      //config
      var disqus_shortname = shortname;
      var disqus_identifier = uri;
      var disqus_title = title;
      var disqus_url = url;

      if(typeof(DISQUS) === 'undefined'){
        (function() {
          var dsq = document.createElement('script');
          dsq.type = 'text/javascript';
          dsq.async = true;
          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
      } else {
        // eslint-disable-next-line
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = disqus_identifier;
            this.page.url = disqus_url;
            this.page.title = disqus_title;
          }
        });
      }
    },
		getPage: function() {
			if(this.year == undefined) return;

      // Hide title. The title is shown after it is modified.
      this.isTitleShown = false;

      var htmlDocUri = 
        '/blog_contents/'
        + this.year + '/'
        + this.month + '/'
        + this.day + '/'
        + this.title + '.html';

      // After loading the document, address variable will be
      // a permalink of this article.
      var uri = htmlDocUri.replace('blog_contents/', '')
                     .replace('.html', '');
      this.address = this.domain + uri;


			var vue = this;
			var xhr = new XMLHttpRequest();
			xhr.open("GET", htmlDocUri, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
          var str = xhr.responseText.substring(0,4);
          if(str == "<!DO" || str == "<hea") {
						window.location.href = "/#/404";
					} else {
						vue.article = xhr.responseText;
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
  max-width: 800px;
  margin: auto;
}

div.waiting {
  background-color: gray;
}

.hidden {
  display:none !important;
}
</style>
