<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.jpg" width="200px" height="200px">
    <HelloWorld msg="Greetings!"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
	data: function() {
		return {
			message: 'hi'
		}
	},
	components: {
		HelloWorld
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
