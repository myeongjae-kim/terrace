<template>
  <div id="app">
    <div id="site-title">
      <router-link to="/">Myeongjae Kim</router-link>
    </div>
    <nav>
      <router-link to="/">About</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/places">Places</router-link>
      <router-link to="/musings">Musings</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
	font-family: 'Source Sans Pro', 'Spoqa Han Sans', Helvetica, Arial, sans-serif;
  font-weight: 300;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

@media screen and (max-width: 600px) {
  #app {
    margin-top: 30px;
  }
}


#site-title {
  margin: 20px 0 20px 0;
	font-family: 'Inconsolata', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
}

@media screen and (max-width: 600px) {
  #site-title {
    margin: 0;
  }
}

#site-title > a {
  color: #2c3e50;
  text-decoration: none;
}

nav {
  padding: 20px 0px 20px 0;
}

nav > a {
  padding: 10px;
  text-decoration: none;
  background: #fff;
  border-radius: 3x;
  color: #2c3e50;
}
nav > a:hover {
  color: #808080;
}

a.router-link-exact-active, a.router-link-exact-active:hover{
  color: #367BB7;
}

a {
  -webkit-transition: color 1s ease-out;
  -moz-transition: color 1s ease-out;
  -o-transition: color 1s ease-out;
  transition: color 1s ease-out;
  color: #367bb7;
  text-decoration: none;
}

a:hover {
  color: #53ADF1;
  -webkit-transition: color 0.2s ease-out;
  -moz-transition: color 0.2s ease-out;
  -o-transition: color 0.2s ease-out;
  transition: color 0.2s ease-out;
}

a:active {
  color: #00841d;
}



::-moz-selection {
   background-color: #2c3e50;
   color: #fff;
}
::selection {
    background-color: #2c3e50;
    color: #fff;
}

.component-title {
  cursor: default;
}

</style>
