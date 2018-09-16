<template>
  <div id="blog">
    <div id="blog-main" v-if="year == undefined">
      <h1 class="component-title">Articles</h1>
      <!-- Show titles of blog contents -->
      <div id="blog-article-list" v-for="i in index" :key="i.path">
        <p><a class="article-title" :href="i.path">{{ i.title }}</a>
        <!-- <br>{{ i.date.monthEng }} {{ i.date.dayEng }}, {{ i.date.year }}</p> -->
        <br><span class="article-date">{{ i.date.year }} / {{ i.date.month }} / {{ i.date.day }}</span></p>
      </div>
      <p>(Under development)</p>
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

    /*
    console.log('myeongjae');
    console.log(this.address.replace(this.domain, "")); // uri as an identifier
    console.log(this.title);
    console.log(this.address);
    */

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
      index :  [{"title":" 디스쿠스 테스트용 아티클입니다.","path":"/#/blog/2018/09/14/disqus-test","date":{"year":"2018","month":"09","monthEng":"September","day":"14","dayEng":"14th"}},{"title":"This is test document2","path":"/#/blog/2018/09/11/this-is-test-document2","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"This is test document1","path":"/#/blog/2018/09/11/this-is-test-document1","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"테스트 3","path":"/#/blog/2018/09/11/test-3","date":{"year":"2018","month":"09","monthEng":"September","day":"11","dayEng":"11st"}},{"title":"temp.html","path":"/#/blog/2018/09/10/temp","date":{"year":"2018","month":"09","monthEng":"September","day":"10","dayEng":"10th"}}],
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
    enableDisqus: function(shortname, identifier, title, url) {
      //config
      if(typeof(DISQUS) === 'undefined'){
        (function() {
          var vars_text = "var disqus_shortname  = \"" + shortname  + "\";\n" + 
           "var disqus_title      = \"" + title      + "\";\n" + 
           "var disqus_identifier = \"" + identifier + "\";\n" +
           "var disqus_url        = \"" + url        + "\";\n";

          var vars_obj   = document.createElement("script");
          vars_obj.type  = "text/javascript";
          vars_obj.async = true;
          vars_obj.text  = vars_text;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(vars_obj);

          var dsq = document.createElement('script');
          dsq.type = 'text/javascript';
          dsq.async = true;
          dsq.src = '//' + shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
      } else {
        // eslint-disable-next-line
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = identifier;
            this.page.url = url;
            this.page.title = title;
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

.hidden {
  display:none !important;
}

.article-title {
  font-size: 1.1em;
}

.article-date {
  font-size: 0.9em;
}

</style>
