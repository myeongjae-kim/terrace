<template>
  <div id="app">
    <div id="site-title">
      <router-link to="/" class="mat-button no-shadow">Myeongjae Kim</router-link>
    </div>
    <nav>
      <router-link to="/"
        class="mat-button no-shadow">About</router-link>
      <router-link to="/blog/"
        class="mat-button no-shadow">Blog</router-link>
      <router-link to="/musings/"
        class="mat-button no-shadow">Musings</router-link>

      <router-link to="/places/"
        class="mat-button no-shadow">Places</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'About',
    titleTemplate: '%s :: Myeongjae Kim',
    meta: [
      { charset: 'utf-8' },
      {
        'property': 'og:title',
        'content': 'About',
        'template': chunk => `${chunk} :: Myeongjae Kim`,
        'vmid': 'og:title'
      },
      {
        'property': 'og:description',
        'content': 'Information of Myeongjae Kim',
        'template': chunk => `${chunk}`,
        'vmid': 'og:description'
      },
      {
        'property': 'og:image',
        'content': 'https://avatars2.githubusercontent.com/u/15189621',
        'template': chunk => `${chunk}`,
        'vmid': 'og:image'
      }
    ]
  },
  mounted: function() {
    /* Materialize button */
    [].forEach.call(document.querySelectorAll('.mat-button'), function(el) {
      el.addEventListener("mousedown", materializeButton);
    });

    function materializeButton (e) {
        var target = e.target;
        var rect = target.getBoundingClientRect();
        var ripple = target.querySelector('.ripple');
        if(ripple !== null) {
          ripple.parentNode.removeChild(ripple);
        }
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
        var top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
        var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
        ripple.style.top = top + 'px';
        ripple.style.left = left + 'px';
        return false;
    }
  }
};


</script>

<style>
table {
  margin:auto;
  border-spacing: 0;
  border-collapse: collapse;
}

table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

table th, table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

table th {
  font-weight: bold;
  text-align: center;
}

table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

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
  margin-top: 47px;
}

@media screen and (max-width: 600px) {
  #app {
    margin-top: 30px;
  }
}


#site-title {
  margin: 20px 0 4px 0;
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
  padding: 9px 0;
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

  font-family: 'Iropke Batang', 'Source Sans Pro', 'Spoqa Han Sans', Helvetica, Arial, sans-serif;
}

blockquote a{
  /*background: #eee;*/
  cursor: pointer;
}

blockquote em{
  font-style: italic;
}

sup {
  font-weight: bold;
}

.footnote {
  font-size: 0.9em;
}

hr {
  border: 0;
  height: 1px;

  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
  
  /*background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));*/
}

strong {
  font-weight: bold;
}

/* Materialize button */

.mat-button {
  color: #2c3e50;
  cursor: pointer;
  
  display: inline-block;
  margin: 0.3em;
  padding: 0.5em 1.5em;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  /*text-transform: uppercase;*/
  border-radius: 3px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -ms-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  box-shadow: 0px 1px 5px rgba(0,0,0,0.5);
  border: none; 
  text-align: center;
}

.mat-button:hover {
  box-shadow: 0px 2px 8px rgba(0,0,0,0.5);
  opacity: 0.5;
}

.no-shadow {
  box-shadow: 0 0 0;

  margin: 0.3em;
  padding: 0.5em 1.5em;
}

.no-shadow:hover {
  box-shadow: 0 0 0;
}

.ripple {
  position: absolute;
  background: rgba(0,0,0,.25);
  border-radius: 100%;
  transform: scale(0.2);
  opacity:0;
  pointer-events: none;
  -webkit-animation: ripple .75s ease-out;
  -moz-animation: ripple .75s ease-out;
  animation: ripple .75s ease-out;
}

@-webkit-keyframes ripple {
  from {
    opacity:1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}

@-moz-keyframes ripple {
  from {
    opacity:1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes ripple {
  from {
    opacity:1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}

nav > .mat-button {
  padding: 10px;
  margin: 0;
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
