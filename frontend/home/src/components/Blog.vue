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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      year: this.$route.params.year,
      month: this.$route.params.month,
      day: this.$route.params.day,
      title: this.$route.params.title,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
