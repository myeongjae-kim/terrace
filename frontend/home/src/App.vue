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
img {
  max-width:100%;
}


pre {
	white-space: pre-wrap;                 /* CSS3 browsers  */
	white-space: -moz-pre-wrap !important; /* 1999+ Mozilla  */
	white-space: -pre-wrap;                /* Opera 4 thru 6 */
	white-space: -o-pre-wrap;              /* Opera 7 and up */
	word-wrap: break-word;                 /* IE 5.5+ and up */
	/* overflow-x: auto; */                /* Firefox 2 only */
	/* width: 99%; */		       /* only if needed */

  background: #fafafa !important;
  padding: 20px;
  line-height: 1.3em;
}

pre > code {
  padding: 0;
}

code {
  font-family: 'Inconsolata', monospace;
  font-size: 0.85em;
  background: #fafafa !important;
  padding: 1px 5px 1px 5px;
  display: inline !important;
}

.hljs {
  background: #fafafa !important;
  padding: 0 !important;
}

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
  /*color: #367BB7;*/
  color: #3073b3;
}

a {
  -webkit-transition: color 1s ease-out;
  -moz-transition: color 1s ease-out;
  -o-transition: color 1s ease-out;
  transition: color 1s ease-out;
  /*color: #367bb7;*/
  color: #3073b3;
  text-decoration: none;
}

a:hover {
  color: #53ADF1;
  -webkit-transition: color 0.4s ease-out;
  -moz-transition: color 0.4s ease-out;
  -o-transition: color 0.4s ease-out;
  transition: color 0.4s ease-out;
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


.component-title {
  cursor: default;
  padding-bottom:15px;
}

@media screen and (max-width: 600px) {
  .component-title {
    margin-top: 0;
    padding-bottom:0;
  }
}

figure {
  text-align: center;
}

@media screen and (max-width: 600px) {
  figure {
    margin: 0;
  }
}


figcaption {
  opacity: 0.5;
  font-size:0.85em;
  font-style:italic;
}

blockquote{
  text-indent: 0.5em;
  opacity: 0.8;

  display:block;
  background: #f9f9f9;
  padding: 15px 20px 15px 20px;
  margin: 0 0 20px;
  position: relative;
  
  /*Box Shadow - (Optional)*/
  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;

  /*Borders - (Optional)*/
  border-left-style: solid;
  border-left-width: 5px;
  border-right-style: solid;
  border-right-width: 1px;    
}

blockquote::before{
  content: "\201C"; /*Unicode for Left Double Quote*/
  
  /*Font*/
  font-size: 60px;
  font-weight: bold;
  color: #999;
  
  /*Positioning*/
  position: absolute;
  left: 10px;
  top:9px;
}

blockquote::after{
  /*Reset to make sure*/
  content: "";
}

blockquote a{
  background: #eee;
  cursor: pointer;
}

blockquote em{
  font-style: italic;
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
