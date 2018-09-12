<template>
  <div class="blog">
    <div id="blog-main" v-if="year == undefined">
      <p>(Under development)</p>
      <h1>Articles</h1>

      <!-- TODO: Show titles of blog contents -->
      <div v-for="i in index" :key="i.path">
        <p><a :href="i.path">{{ i.title }}</a>
        <!-- <br>{{ i.date.monthEng }} {{ i.date.dayEng }}, {{ i.date.year }}</p> -->
        <br>{{ i.date.year }} / {{ i.date.month }} / {{ i.date.day }}</p>
      </div>

      <!-- <img src="https://cdn.myeongjae.kim/res/logo1.jpg" width="300px"> -->
    </div>
    <div id="blog-contents" v-else>
      <div class="blog-title">
        <h1>{{ title }}</h1>
        <p class="meta">{{ year }} / {{ month }} / {{ day }}</p>
      </div>
			<div v-html="article"></div>
      <p>{{ address }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  mounted: function() {
		this.getPage();
    this.getIndex();
	},
  updated: function() {
    // I have to get index when an article is read first and the blog main
    // is requested.
    this.getIndex();

    // Change file name to document's title
    // When the page is an artice page, get blogContents
    var blogContents = document.querySelector('#blog-contents');
    if(blogContents == null){
      return;
    }

    // Find all h1 tags, and choose second h1. It is real title of this doc.
    var titles = blogContents.querySelectorAll('h1');
    if(titles.length <= 1) {
      return;
    }

    this.titles = titles[1].innerHTML;
    titles[1].remove();

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
			article: "Loading...",
      address : "",
      index : null,
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
					}
				}
			};
			xhr.send();
		},
    getIndex: function() {
    // Load index file only at the main page and there is index is not yet loaded
      if(this.index == null && this.year == undefined) {
        // This is main page and index is not yet loaded.
        var vue = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/blog_contents/index.json", true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            vue.index = JSON.parse(xhr.responseText);

            /*
            // eslint-disable-next-line
            console.log(vue.index);
            // eslint-disable-next-line
            console.log(vue.index[0].title);
            // eslint-disable-next-line
            console.log(vue.index[0].path);
            */
          }
        };
        xhr.send();
      }
    }
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
</style>
