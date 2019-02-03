<template>
  <div id="app">
    <div id="site-title">
      <router-link to="/" class="mat-button no-shadow">Myeongjae Kim</router-link>
    </div>
    <nav>
      <router-link to="/" class="mat-button no-shadow">About</router-link>
      <router-link to="/blog/" class="mat-button no-shadow">Blog</router-link>
      <router-link to="/daily/" class="mat-button no-shadow">Daily</router-link>
      <router-link to="/musings/" class="mat-button no-shadow">Musings</router-link>
      <router-link to="/places/" class="mat-button no-shadow">Places</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app",
  metaInfo: {
    title: "About",
    titleTemplate: "%s :: Myeongjae Kim",
    meta: [
      { charset: "utf-8" },
      {
        property: "og:title",
        content: "About",
        template: chunk => `${chunk} :: Myeongjae Kim`,
        vmid: "og:title"
      },
      {
        property: "og:description",
        content: "Information of Myeongjae Kim",
        template: chunk => `${chunk}`,
        vmid: "og:description"
      },
      {
        property: "og:image",
        content: "https://avatars2.githubusercontent.com/u/15189621",
        template: chunk => `${chunk}`,
        vmid: "og:image"
      }
    ]
  },
  mounted: function() {
    /* Materialize button */
    [].forEach.call(document.querySelectorAll(".mat-button"), function(el) {
      el.addEventListener("mousedown", materializeButton);
    });

    function materializeButton(e) {
      var target = e.target;
      var rect = target.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.height = ripple.style.width =
        Math.max(rect.width, rect.height) + "px";
      target.appendChild(ripple);

      setTimeout(function() {
        ripple.parentNode.removeChild(ripple);
      }, 2000);

      var top =
        e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
      var left =
        e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
      ripple.style.top = top + "px";
      ripple.style.left = left + "px";
      return false;
    }
    this.loadWebFonts();
  },
  methods: {
    // Loading Webfonts
    // Below codes are from https://mytory.net/2016/06/15/webfont-best-practice.html
    loadWebFonts: function() {
      (async () => {
        "use strict";
        // 스매싱 매거진의 '지연된 웹폰트 불러오기' javascript를 안형우가 수정한 것.
        // https://gist.github.com/hdragomir/8f00ce2581795fd7b1b7

        // 한 번 캐시하면 css 파일은 클라이언트 측에 저장한다.
        // 아래 woffPath 가 바뀌면 그 때 다시 받는다.
        // woff base64를 내장한 css
        var woffPath = "https://cdn.myeongjae.kim/css/fonts_woff.css";
        // woff2 base64를 내장한 css
        var woff2Path = "https://cdn.myeongjae.kim/css/fonts_woff2.css";

        // 간단한 이벤트 핸들러 함수
        function on(el, ev, callback) {
          if (el.addEventListener) {
            el.addEventListener(ev, callback, false);
          } else if (el.attachEvent) {
            el.attachEvent("on" + ev, callback);
          }
        }

        // localStorage 에 글꼴이 저장돼 있거나, 네이티브 브라우저 캐시를 이용해 저장했다면...
        if (
          (window.localStorage && localStorage.fontCache) ||
          document.cookie.indexOf("fontCache") > -1
        ) {
          // 캐시된 버전을 사용한다.
          injectFontsStylesheet();
        } else {
          // 캐시된 버전이 없으면 페이지 로딩을 막지 않고 기다렸다가
          // 페이지가 전부 load 되면 웹폰트를 다운로드한다.
          on(window, "load", injectFontsStylesheet);
        }

        /**
         * css 파일이 브라우저에 저장됐는지 확인하는 함수.
         * @param href
         * @returns {Storage|string|*|boolean}
         */
        function isFileCached(href) {
          return (
            window.localStorage &&
            localStorage.fontCache &&
            localStorage.fontCacheFile === href
          );
        }

        /**
         * 실제 css 내용을 넣는 함수
         */
        function injectFontsStylesheet() {
          var supportsWoff2 = (function(win) {
            if (!("FontFace" in win)) {
              return false;
            }

            var f = new FontFace(
              "t",
              'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )',
              {}
            );
            f.load()["catch"](function() {});

            return f.status == "loading" || f.status == "loaded";
          })(window);

          // woff 지원 여부는 체크하지 않는다. 안드로이드 4.4 미만, IE9 미만은 woff를 지원하지 않는데, 워낙 소수라 일단 디텍트 코드를 넣지 않았다.
          var fontPath = woffPath;
          if (supportsWoff2) {
            fontPath = woff2Path;
          }

          if (isFileCached(fontPath)) {
            // 로컬 스토리지에 캐시한 버전이 있다면 그걸 <head>에 박는다.
            injectRawStyle(localStorage.fontCache);
          } else {
            // 아니면, ajax 로 불러온다.
            // jQuery 만 쓴 분들은 생소하겠지만, 이게 plain js로 구현한 ajax 다.
            var xhr = new XMLHttpRequest();
            xhr.open("GET", fontPath, true);

            // ajax 에서 addEventListener 나 attachEvent 를 지원하지 않는 IE8을 위한 조치
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.responseText[0] === "<") {
                  return;
                }

                // ajax 로 받은 css 내용을 <head>에 박는다.
                injectRawStyle(xhr.responseText);
                // 그리고 css 내용을 로컬 스토리지에 집어 넣어 나중에도 쓸 수 있게 한다.
                // 기존에 저장된 것이 있다면 덮어쓴다는 점을 알아 둬라.
                localStorage.fontCache = xhr.responseText;
                localStorage.fontCacheFile = fontPath;
              }
            };
            xhr.send();
          }
        }

        /**
         * css 텍스트를 <head>에 집어넣는 간단한 함수
         * @param text
         */
        function injectRawStyle(text) {
          var style = document.createElement("style");
          // style.innerHTML 을 지원하지 않는 IE8을 위한 조치
          style.setAttribute("type", "text/css");
          if (style.styleSheet) {
            style.styleSheet.cssText = text;
          } else {
            style.innerHTML = text;
          }
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      })();
    }
  }
};
</script>

<style>
table {
  margin: auto;
  border-spacing: 0;
  border-collapse: collapse;
}

table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

table th,
table td {
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
  max-width: 100%;

  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;

  border-radius: 5px;
}

pre {
  white-space: pre-wrap; /* CSS3 browsers  */
  white-space: -moz-pre-wrap !important; /* 1999+ Mozilla  */
  white-space: -pre-wrap; /* Opera 4 thru 6 */
  white-space: -o-pre-wrap; /* Opera 7 and up */
  word-wrap: break-word; /* IE 5.5+ and up */
  /* overflow-x: auto; */ /* Firefox 2 only */
  /* width: 99%; */ /* only if needed */

  background: #fafafa !important;
  padding: 20px;
  line-height: 1.3em;

  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;

  border-radius: 5px;
}

pre > code {
  padding: 0;
}

code {
  font-family: "Inconsolata", monospace;
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
  font-family: "Source Sans Pro", "Spoqa Han Sans", Helvetica, Arial, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 47px;
}

@media screen and (max-width: 600px) {
  #app {
    margin-top: 20px;
  }
}

#site-title {
  margin: 20px 0 4px 0;
  font-family: "Inconsolata", Helvetica, Arial, sans-serif;
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

@media screen and (max-width: 600px) {
  nav {
    padding: 0 0 12px 0;
  }
}

nav > a {
  padding: 10px;
  text-decoration: none;
  /*background: #fff;*/
  border-radius: 3x;
  color: #2c3e50;
}
nav > a:hover {
  color: #808080;
}

a.router-link-exact-active,
a.router-link-exact-active:hover {
  color: #367bb7;
  /* color: #3073b3; */
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
  color: #53adf1;
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
  padding-bottom: 15px;
}

@media screen and (max-width: 600px) {
  .component-title {
    margin-top: 0;
    padding-bottom: 0;
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
  font-size: 0.85em;
  font-style: italic;
}

blockquote {
  text-indent: 0.5em;
  opacity: 0.8;

  display: block;
  background: #fafafa;
  padding: 15px 20px 15px 20px;
  margin: 0 0 20px;
  position: relative;

  /*Box Shadow - (Optional)*/
  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;

  font-family: "Iropke Batang", "Source Sans Pro", "Spoqa Han Sans", Helvetica,
    Arial, sans-serif;

  border-radius: 5px;
}

blockquote a {
  /*background: #eee;*/
  cursor: pointer;
}

blockquote em {
  font-style: italic;
}

sup {
  font-weight: bold;
}

.footnote {
  font-size: 0.8em;
  opacity: 0.9;
  margin-top: -1em;
  margin-left: 1em;
  line-height: 1em;
}

hr {
  border: 0;
  height: 1px;

  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);

  /*background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));*/
  opacity: 0.7;
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

  -moz-box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
  border: none;
  text-align: center;
}

.mat-button:hover {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
}

.no-shadow {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  /*
  margin: 0.3em;
  padding: 0.5em 1.5em;
  */
}

.no-shadow:hover {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  -moz-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  -webkit-box-shadow: 0 0 0 rgba(0, 0, 0, 0);
}

.ripple {
  position: absolute;
  background: rgba(48, 115, 179, 0.5);
  /*background: rgba(0,0,0,.25);*/
  border-radius: 100%;
  transform: scale(0.2);
  opacity: 0;
  pointer-events: none;
  -webkit-animation: ripple 0.75s ease-out;
  -moz-animation: ripple 0.75s ease-out;
  animation: ripple 0.75s ease-out;
}

@-webkit-keyframes ripple {
  from {
    opacity: 1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}

@-moz-keyframes ripple {
  from {
    opacity: 1;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes ripple {
  from {
    opacity: 1;
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
  letter-spacing: 0.1rem;
  /*text-transform: uppercase; */
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid #bbb;
  cursor: pointer;
  box-sizing: border-box;
}
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
  outline: 0;
}
.button.button-primary,
button.button-primary,
input[type="submit"].button-primary,
input[type="reset"].button-primary,
input[type="button"].button-primary {
  color: #fff;
  background-color: #33c3f0;
  border-color: #33c3f0;
}
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
  color: #fff;
  background-color: #1eaedb;
  border-color: #1eaedb;
}

button,
.button {
  box-shadow: 2px 2px 3px #ddd;
  -moz-box-shadow: 2px 2px 3px #ddd;
  -webkit-box-shadow: 2px 2px 3px #ddd;
}

.center {
  display: block;
  margin: auto;
}

.shadow {
  -moz-box-shadow: 2px 2px 15px #ccc;
  -webkit-box-shadow: 2px 2px 15px #ccc;
  box-shadow: 2px 2px 15px #ccc;
}

iframe {
  border: 0;
}
</style>
