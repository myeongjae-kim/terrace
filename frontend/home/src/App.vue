<template>
  <div id="app">
    <div id="site-title">
      <router-link to="/">Myeongjae Kim</router-link>
    </div>
    <nav>
      <router-link to="/">About</router-link>
      <router-link to="/blog">Blog</router-link>
      <router-link to="/musings">Musings</router-link>

      <router-link to="/places">Places</router-link>
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

/* Below codes are from http://getskeleton.com */

/* Buttons
–––––––––––––––––––––––––––––––––––––––––––––––––– */
.button,
button,
input[type="submit"],
input[type="reset"],
input[type="button"] {
  display: inline-block;
  height: 38px;
  padding: 0 30px;
  color: #555;
  text-align: center;
  font-size: 11px;
  /*font-weight: 600;*/
  line-height: 38px;
  letter-spacing: .1rem;
  /*text-transform: uppercase; */
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  box-sizing: border-box; }
.button:hover,
button:hover,
input[type="submit"]:hover,
input[type="reset"]:hover,
input[type="button"]:hover,
.button:focus,
button:focus,
input[type="submit"]:focus,
input[type="reset"]:focus,
input[type="button"]:focus {
  color: #333;
  border-color: #888;
  outline: 0; }
.button.button-primary,
button.button-primary,
input[type="submit"].button-primary,
input[type="reset"].button-primary,
input[type="button"].button-primary {
  color: #FFF;
  background-color: #33C3F0;
  border-color: #33C3F0; }
.button.button-primary:hover,
button.button-primary:hover,
input[type="submit"].button-primary:hover,
input[type="reset"].button-primary:hover,
input[type="button"].button-primary:hover,
.button.button-primary:focus,
button.button-primary:focus,
input[type="submit"].button-primary:focus,
input[type="reset"].button-primary:focus,
input[type="button"].button-primary:focus {
  color: #FFF;
  background-color: #1EAEDB;
  border-color: #1EAEDB; }


</style>
