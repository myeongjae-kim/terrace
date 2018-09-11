<template>
  <div class="blog">
    <div id="blog-main" v-if="year == undefined">
      <!-- TODO: Show titles of blog contents -->
      <h1>Blog</h1>
      <p>Under development.</p>
      <img src="https://cdn.myeongjae.kim/res/logo1.jpg" width="300px">
    </div>
    <div id="blog-contents" v-else>
      <p> {{ year }} / {{ month }} / {{ day }} / {{ title }}</p>

			<div v-html="contents"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  mounted: function() {
		if(this.year == undefined) return;

		var adr = '/blog_contents/' + this.year + '/' + this.month + '/' + this.day + '/' + this.title + '.html';

		var vue = this;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", adr, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if(xhr.responseText.substring(0,4) == "<!DO") {
					window.location.href = "/#/404";
				} else {
					vue.contents = xhr.responseText;
				}
			}
		};
		xhr.send();
	},
	data() {
		return {
			year: this.$route.params.year,
			month: this.$route.params.month,
			day: this.$route.params.day,
			title: this.$route.params.title,
			contents: "Loading...",
		}
	},
	updated: function() {
		// eslint-disable-next-line
		console.log(this.contents);

		// Find every a tag.
		// If it has link to my homepage itself, modify it to router link
		var article = document.querySelector('#blog-contents');
    [].forEach.call(article.querySelectorAll('a'), function(el) {
			var target = el.getAttribute('href');
			if(target == null) return;
			
			// eslint-disable-next-line
			console.log(el.getAttribute('href'));

			if( ! (target[0] == '/' || target[0] == '#') ) return;

			// eslint-disable-next-line
			console.log("Link to itself. Generate a link");

    });
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
