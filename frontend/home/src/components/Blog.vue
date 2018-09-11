<template>
  <div class="blog">
    <div id="blog-main" v-if="year == undefined">
      <!-- TODO: Show titles of blog contents -->
      <h1>Blog</h1>
      <p>Under development. <router-link to='/blog/2018/09/11/this-is-test-document1'>Go to test doc</router-link></p>
      <img src="https://cdn.myeongjae.kim/res/logo1.jpg" width="300px">
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
	},
  updated: function() {
    // Change file name to document's title
    var title = document.querySelector('#blog-contents');
    if(title == null) return;

    title = title.querySelectorAll('h1');
    if(title.length == 1) return;

    this.title = title[1].innerHTML;
    title[1].remove();
  },
	data() {
		return {
			year: this.$route.params.year,
			month: this.$route.params.month,
			day: this.$route.params.day,
			title: this.$route.params.title,
			article: "Loading...",
      address : "",
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

          // eslint-disable-next-line
          console.log(str);

          if(str == "<!DO" || str == "<met") {
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
