(function(t){function e(e){for(var a,i,s=e[0],c=e[1],l=e[2],d=0,u=[];d<s.length;d++)i=s[d],o[i]&&u.push(o[i][0]),o[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);m&&m(e);while(u.length)u.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(a=!1)}a&&(r.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},i={app:0},o={app:0},r=[];function s(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-091b":"f3e36591","chunk-1aae":"84cb65f7","chunk-2bf5":"b267a1c2"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-091b":1,"chunk-1aae":1,"chunk-2bf5":1};i[t]?e.push(i[t]):0!==i[t]&&n[t]&&e.push(i[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-091b":"4c4e29c3","chunk-1aae":"e6a1c6e7","chunk-2bf5":"ed8d1493"}[t]+".css",i=c.p+a,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var s=o[r],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===i))return e()}var d=document.getElementsByTagName("style");for(r=0;r<d.length;r++){s=d[r],l=s.getAttribute("data-href");if(l===a||l===i)return e()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=e,u.onerror=function(e){var a=e&&e.target&&e.target.src||i,o=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");o.request=a,n(o)},u.href=i;var m=document.getElementsByTagName("head")[0];m.appendChild(u)}).then(function(){i[t]=0}));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var r=new Promise(function(e,n){a=o[t]=[e,n]});e.push(a[2]=r);var l,d=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(t),l=function(e){u.onerror=u.onload=null,clearTimeout(m);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+a+": "+i+")");r.type=a,r.request=i,n[1](r)}o[t]=void 0}};var m=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,d.appendChild(u)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=e,l=l.slice();for(var u=0;u<l.length;u++)e(l[u]);var m=d;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("04f5"),i=n.n(a);i.a},"04f5":function(t,e,n){},"3f1b":function(t,e,n){"use strict";var a=n("9ee2"),i=n.n(a);i.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"site-title"}},[n("router-link",{staticClass:"mat-button no-shadow",attrs:{to:"/"}},[t._v("Myeongjae Kim")])],1),n("nav",[n("router-link",{staticClass:"mat-button no-shadow",attrs:{to:"/"}},[t._v("About")]),n("router-link",{staticClass:"mat-button no-shadow",attrs:{to:"/blog/"}},[t._v("Blog")]),n("router-link",{staticClass:"mat-button no-shadow",attrs:{to:"/musings/"}},[t._v("Musings")]),n("router-link",{staticClass:"mat-button no-shadow",attrs:{to:"/places/"}},[t._v("Places")])],1),n("router-view")],1)},o=[],r=(n("96cf"),n("3040")),s=(n("ac6a"),{name:"app",metaInfo:{title:"About",titleTemplate:"%s :: Myeongjae Kim",meta:[{charset:"utf-8"},{property:"og:title",content:"About",template:function(t){return"".concat(t," :: Myeongjae Kim")},vmid:"og:title"},{property:"og:description",content:"Information of Myeongjae Kim",template:function(t){return"".concat(t)},vmid:"og:description"},{property:"og:image",content:"https://avatars2.githubusercontent.com/u/15189621",template:function(t){return"".concat(t)},vmid:"og:image"}]},mounted:function(){function t(t){var e=t.target,n=e.getBoundingClientRect(),a=document.createElement("span");a.className="ripple",a.style.height=a.style.width=Math.max(n.width,n.height)+"px",e.appendChild(a),setTimeout(function(){a.parentNode.removeChild(a)},2e3);var i=t.pageY-n.top-a.offsetHeight/2-document.body.scrollTop,o=t.pageX-n.left-a.offsetWidth/2-document.body.scrollLeft;return a.style.top=i+"px",a.style.left=o+"px",!1}[].forEach.call(document.querySelectorAll(".mat-button"),function(e){e.addEventListener("mousedown",t)}),this.loadWebFonts()},methods:{loadWebFonts:function(){Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n,a,i,o,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:r=function(t){var e=document.createElement("style");e.setAttribute("type","text/css"),e.styleSheet?e.styleSheet.cssText=t:e.innerHTML=t,document.getElementsByTagName("head")[0].appendChild(e)},o=function(){var t=function(t){if(!("FontFace"in t))return!1;var e=new FontFace("t",'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )',{});return e.load()["catch"](function(){}),"loading"==e.status||"loaded"==e.status}(window),a=e;if(t&&(a=n),i(a))r(localStorage.fontCache);else{var o=new XMLHttpRequest;o.open("GET",a,!0),o.onreadystatechange=function(){if(4===o.readyState){if("<"===o.responseText[0])return;r(o.responseText),localStorage.fontCache=o.responseText,localStorage.fontCacheFile=a}},o.send()}},i=function(t){return window.localStorage&&localStorage.fontCache&&localStorage.fontCacheFile===t},a=function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on"+e,n)},e="https://cdn.myeongjae.kim/css/fonts_woff.css",n="https://cdn.myeongjae.kim/css/fonts_woff2.css",window.localStorage&&localStorage.fontCache||document.cookie.indexOf("fontCache")>-1?o():a(window,"load",o);case 7:case"end":return t.stop()}},t,this)}))()}}}),c=s,l=(n("034f"),n("2877")),d=Object(l["a"])(c,i,o,!1,null,null,null);d.options.__file="App.vue";var u=d.exports,m=n("8c4f"),h=n("0a89"),p=n.n(h),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("img",{staticClass:"shadow",attrs:{id:"profileImage",alt:"dev@myeongjae.kim from gravatar.com",width:"200px",height:"200px"}}),n("img",{staticStyle:{display:"none"},attrs:{id:"baedal-move"}}),t._m(0),n("div",{attrs:{id:"personal-info"}},[n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:["fas","child"]}})],1),n("div",{staticClass:"text"},[t._v("Software Developer")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"map-marker-alt"}})],1),n("div",{staticClass:"text"},[n("router-link",{attrs:{to:"/places/"}},[t._v("Seoul, Korea")])],1)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"user-tie"}})],1),n("div",{staticClass:"text"},[t._v("Résumé")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:["fab","github"]}})],1),t._m(1)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"envelope"}})],1),t._m(2)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"pen-nib"}})],1),t._m(3)])]),t._m(4)])},v=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[n("span",{attrs:{id:"name-eng"}},[t._v("Myeongjae Kim")]),n("span",{attrs:{id:"name-kor"}},[t._v("(김명재)")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://github.com/hrzon"}},[t._v("github.com/hrzon")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"mailto:dev@myeongjae.kim"}},[t._v("dev@myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://blog.myeongjae.kim"}},[t._v("blog.myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{attrs:{id:"footer"}},[t._v("\n\n    If you like my website, you can copy it from\n      "),n("a",{attrs:{href:"https://github.com/hrzon/terrace"}},[t._v("here")]),t._v(".\n\n  ")])}],f={name:"About",mounted:function(){Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=new Image,n=document.getElementById("profileImage"),e.onload=function(){n.src=e.src},e.src="https://cdn.myeongjae.kim/res/profile.jpeg";case 4:case"end":return t.stop()}},t,this)}))(),Object(r["a"])(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=new Image,n=document.getElementById("baedal-move"),e.onload=function(){n.src=e.src,n.style.display="initial"},e.src="https://cdn.myeongjae.kim/res/baedal_move.png";case 4:case"end":return t.stop()}},t,this)}))()}},y=f,b=(n("d4e1"),Object(l["a"])(y,g,v,!1,null,"5d5c7f89",null));b.options.__file="About.vue";var A=b.exports,E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"blog"}},[void 0===t.year?n("div",{attrs:{id:"blog-main"}},[n("h1",{staticClass:"component-title"},[t._v("Articles")]),t._l(t.index,function(e){return n("div",{key:e.path,staticClass:"blog-article-list"},[n("p",{staticClass:"article-info"},[n("router-link",{staticClass:"article-title",attrs:{to:e.path}},[t._v(t._s(e.title))]),n("br"),n("span",{staticClass:"article-date"},[t._v(t._s(e.date.year)+" / "+t._s(e.date.month)+" / "+t._s(e.date.day))])],1)])})],2):n("div",{attrs:{id:"blog-contents"}},[n("article",[n("div",{staticClass:"inner-title-container"},[n("h1",[n("a",{attrs:{href:t.address,id:"inner-title"}},[t._v(t._s(t.title))])]),n("p",{staticClass:"meta"},[t._v(t._s(t.year)+" / "+t._s(t.month)+" / "+t._s(t.day))])]),n("div",{attrs:{id:"padding-between-title-and-article"}}),n("div",{attrs:{id:"article-content"},domProps:{innerHTML:t._s(t.article)}})]),n("hr"),n("div",{attrs:{id:"adjacent-articles"}},[t.currentArticleIdx>0?n("div",{attrs:{id:"next-article"}},[n("h4",[t._v("Next Article")]),n("p",[n("router-link",{attrs:{to:t.index[t.currentArticleIdx-1].path}},[t._v(t._s(t.index[t.currentArticleIdx-1].title))])],1)]):t._e(),t.currentArticleIdx<t.index.length-1?n("div",{attrs:{id:"prev-article"}},[n("h4",[t._v("Previous Article")]),n("p",[n("router-link",{attrs:{to:t.index[t.currentArticleIdx+1].path}},[t._v(t._s(t.index[t.currentArticleIdx+1].title))])],1)]):t._e()]),n("hr",{staticStyle:{"margin-top":"28px"}}),n("div",{attrs:{id:"share-buttons"}},[n("button",{staticClass:"copy-btn",attrs:{"data-clipboard-text":t.address}},[t._v(t._s(t.copyBtnMsg))]),t._v("\n       \n      "),n("router-link",{attrs:{to:"/blog/"}},[n("button",[t._v("Article List")])])],1),n("div",{attrs:{id:"utterances-container"}})]),n("a",{staticClass:"back_to_top"},[t._v("↑")])])},_=[],x=(n("a481"),n("b311")),w=n.n(x),C=n("a70e"),k=n.n(C);n("8159");k.a.registerLanguage("vim",n("3c69")),k.a.registerLanguage("bash",n("f0f8"));var T={name:"Blog",metaInfo:function(){return void 0===this.title?{title:"Blog",meta:[{charset:"utf-8"},{property:"og:title",content:"Blog",template:function(t){return"".concat(t," :: Myeongjae Kim")},vmid:"og:title"},{property:"og:description",content:"Article List",template:function(t){return"".concat(t)},vmid:"og:description"}]}:{title:this.title,meta:[{charset:"utf-8"},{property:"og:title",content:this.title,template:function(t){return"".concat(t," :: Myeongjae Kim")},vmid:"og:title"},{property:"og:description",content:"Thank you for reading my article 🙈",template:function(t){return"".concat(t)},vmid:"og:description"}]}},mounted:function(){this.initCopyButton(),this.getPage(),this.initBackToTopButton()},beforeDestroy:function(){this.ClipboardJS.destroy()},updated:function(){var t=document.querySelector("#blog-contents");if(null!=t){var e=t.querySelectorAll("h1");if(!(e.length<=1)){var n=t.querySelector("#inner-title");n.innerHTML=e[1].innerHTML,e[1].style.display="none";var a=document.querySelector("nav"),i=!1;[].forEach.call(a.querySelectorAll("a"),function(t){i||"/blog/"==t.getAttribute("href")&&(t.setAttribute("class",t.getAttribute("class")+" router-link-exact-active"),i=!0)}),[].forEach.call(document.querySelectorAll("code"),function(t){k.a.highlightBlock(t)}),this.initUtterances()}}else this.toTheTop()},data:function(){return{year:this.$route.params.year,month:this.$route.params.month,day:this.$route.params.day,title:this.$route.params.title,article:"",address:"",domain:"https://blog.myeongjae.kim",copyBtnMsg:"Copy Link",copiedBtnMsg:"Copied",ClipboardJS:null,currentArticleIdx:null,uri:"",utterancesSrc:"",index:[{relativeId:0,title:"[웹] Single Page App의 Search Engine Optimization과 VueJS",path:"/blog/2018/09/23/single-page-app의-search-engine-optimizaion과-vuejs/",date:{year:"2018",month:"09",monthEng:"September",day:"23",dayEng:"23rd"}},{relativeId:1,title:"[웹] 블로깅 시스템을 만들었습니다",path:"/blog/2018/09/18/블로깅-시스템을-만들었습니다/",date:{year:"2018",month:"09",monthEng:"September",day:"18",dayEng:"18th"}},{relativeId:2,title:"[기술] Rob Pike의 프로그래밍 규칙 5가지",path:"/blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/",date:{year:"2017",month:"09",monthEng:"September",day:"17",dayEng:"17th"}},{relativeId:3,title:"[vim/Linux] 13. vim-go와 deoplete-go, Go언어를 위한 플러그인",path:"/blog/2017/07/20/vimlinux-13-vim-go와-deoplete-go-go언어를-위한-플러그인/",date:{year:"2017",month:"07",monthEng:"July",day:"20",dayEng:"20th"}},{relativeId:4,title:"[vim/Linux] 12. 고요(Goyo), 방해금지 모드 플러그인",path:"/blog/2017/07/20/vimlinux-12-고요goyo-방해금지-모드-플러그인/",date:{year:"2017",month:"07",monthEng:"July",day:"20",dayEng:"20th"}},{relativeId:5,title:"[vim/Linux] 11. NERD Commenter, 주석 단축키 플러그인",path:"/blog/2017/07/19/vimlinux-11-nerd-commenter-주석-단축키-플러그인/",date:{year:"2017",month:"07",monthEng:"July",day:"19",dayEng:"19th"}},{relativeId:6,title:"[vim/Linux] 10. deoplete과 clang_complete, 자동 완성 플러그인",path:"/blog/2017/07/19/vimlinux-10-deoplete과-clang_complete-자동-완성-플러그인/",date:{year:"2017",month:"07",monthEng:"July",day:"19",dayEng:"19th"}},{relativeId:7,title:"[vim/Linux] 9. Synatstic, 문법 체크 플러그인",path:"/blog/2017/07/18/vimlinux-9-synatstic-문법-체크-플러그인/",date:{year:"2017",month:"07",monthEng:"July",day:"18",dayEng:"18th"}},{relativeId:8,title:"[vim/Linux] 8. UltiSnip과 vim-snippets",path:"/blog/2017/07/15/vimlinux-8-ultisnip과-vim-snippets/",date:{year:"2017",month:"07",monthEng:"July",day:"15",dayEng:"15th"}},{relativeId:9,title:"[vim/Linux] 7. delimitMate, 괄호 자동 완성 플러그인",path:"/blog/2017/07/15/vimlinux-7-delimitmate-괄호-자동-완성-플러그인/",date:{year:"2017",month:"07",monthEng:"July",day:"15",dayEng:"15th"}},{relativeId:10,title:"[vim/Linux] 6. vim-multiple-cursor와 vim-smooth-scroll",path:"/blog/2017/07/14/vimlinux-6-vim-multiple-cursor와-vim-smooth-scroll/",date:{year:"2017",month:"07",monthEng:"July",day:"14",dayEng:"14th"}},{relativeId:11,title:"[vim/Linux] 5. The NERD Tree 설치하기",path:"/blog/2017/07/14/vimlinux-5-the-nerd-tree-설치하기/",date:{year:"2017",month:"07",monthEng:"July",day:"14",dayEng:"14th"}},{relativeId:12,title:"끝까지 가자",path:"/blog/2016/12/03/끝까지-가자/",date:{year:"2016",month:"12",monthEng:"December",day:"03",dayEng:"3rd"}},{relativeId:13,title:"[macOS] 맥 터미널로 우분투 사용하기",path:"/blog/2016/11/02/macos-맥-터미널로-우분투-사용하기/",date:{year:"2016",month:"11",monthEng:"November",day:"02",dayEng:"2nd"}},{relativeId:14,title:"[vim/Linux] 4. 플러그인 매니저를 설치하고 vim-airline 설치하기",path:"/blog/2016/10/06/vimlinux-4-플러그인-매니저를-설치하고-vim-airline-설치하기/",date:{year:"2016",month:"10",monthEng:"October",day:"06",dayEng:"6th"}},{relativeId:15,title:"[vim/Linux] 3. vimrc 기본설정",path:"/blog/2016/10/02/vimlinux-3-vimrc-기본설정/",date:{year:"2016",month:"10",monthEng:"October",day:"02",dayEng:"2nd"}},{relativeId:16,title:"[vim/Linux] 2. Neovim 설치하고 24bit 컬러 적용하기",path:"/blog/2016/10/01/vimlinux-2-neovim-설치하고-24bit-컬러-적용하기/",date:{year:"2016",month:"10",monthEng:"October",day:"01",dayEng:"1st"}},{relativeId:17,title:"[vim/Linux] 1. vim을 왜 쓰냐고?",path:"/blog/2016/10/01/vimlinux-1-vim을-왜-쓰냐고/",date:{year:"2016",month:"10",monthEng:"October",day:"01",dayEng:"1st"}},{relativeId:18,title:"[책] ‘소프트웨어 장인’에서 언급한 책 10권",path:"/blog/2016/06/27/책-소프트웨어-장인에서-언급한-책-10권/",date:{year:"2016",month:"06",monthEng:"June",day:"27",dayEng:"27th"}},{relativeId:19,title:"[책] 소프트웨어 장인",path:"/blog/2016/03/01/소프트웨어-장인정신-서평/",date:{year:"2016",month:"03",monthEng:"March",day:"01",dayEng:"1st"}},{relativeId:20,title:"[발췌] 상아탑 아키텍트 대처하기",path:"/blog/2016/03/01/발췌-상아탑-아키텍트-대처하기/",date:{year:"2016",month:"03",monthEng:"March",day:"01",dayEng:"1st"}},{relativeId:21,title:"[책] 소프트웨어, 누가 이렇게 개떡같이 만든거야?",path:"/blog/2016/02/26/소프트웨어-누가-이렇-개떡-같이-만든거야/",date:{year:"2016",month:"02",monthEng:"February",day:"26",dayEng:"26th"}},{relativeId:22,title:"[발췌] 마초를 만드는 환경",path:"/blog/2016/02/10/마초를-만드는-환경/",date:{year:"2016",month:"02",monthEng:"February",day:"10",dayEng:"10th"}},{relativeId:23,title:"[발췌] 남자아이가 마초가 되어가는 과정",path:"/blog/2016/02/10/남자아이가-마초가-되어가는-과정/",date:{year:"2016",month:"02",monthEng:"February",day:"10",dayEng:"10th"}},{relativeId:24,title:"[발췌] 가장 오래된 작품들이 가장 덜 낡았다",path:"/blog/2016/01/19/가장-오래된-작품들이-가장-덜-낡았다/",date:{year:"2016",month:"01",monthEng:"January",day:"19",dayEng:"19th"}},{relativeId:25,title:"[발췌] 진정한 교양?",path:"/blog/2016/01/14/진정한-교양/",date:{year:"2016",month:"01",monthEng:"January",day:"14",dayEng:"14th"}},{relativeId:26,title:"[발췌] 독자는 의무가 아닌 애정의 행로를 따라가야 한다",path:"/blog/2016/01/14/독자는-의무가-아닌-애정의-행로를-따라가야-한다/",date:{year:"2016",month:"01",monthEng:"January",day:"14",dayEng:"14th"}},{relativeId:27,title:"[책] The C Programming Language",path:"/blog/2015/10/17/the-c-programming-language/",date:{year:"2015",month:"10",monthEng:"October",day:"17",dayEng:"17th"}}]}},watch:{$route:function(t){this.year=t.params.year,this.month=t.params.month,this.day=t.params.day,this.title=t.params.title,this.getPage()}},methods:{initUtterances:function(){var t=document.querySelector("#utterances-container");0!==t.childNodes.length&&t.removeChild(t.firstChild);var e=document.createElement("script");e.setAttribute("src","https://utteranc.es/client.js"),e.setAttribute("repo","hrzon/terrace_comments"),e.setAttribute("issue-term","pathname"),e.setAttribute("theme","github-light"),e.setAttribute("crossorigin","anonymous"),e.setAttribute("async",""),t.appendChild(e)},initBackToTopButton:function(){var t=this;(function(){function e(){var t=window.pageYOffset,e=document.documentElement.clientHeight/2;t>e&&n.classList.add("back_to_top-show"),t<e&&n.classList.remove("back_to_top-show")}var n=document.querySelector(".back_to_top");window.addEventListener("scroll",e),n.addEventListener("click",t.toTheTop)})()},toTheTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0},copyUrl:function(t){var e;if(t.srcElement)e=t.srcElement;else{if(!t.target)return;e=t.target}e.setAttribute("class"," button-clicked"),e.innerHTML=this.copiedBtnMsg;var n=this;setTimeout(function(){e.setAttribute("class",null),e.innerHTML=n.copyBtnMsg},1100)},getPage:function(){if(void 0!=this.year){this.toTheTop();var t=document.querySelector("#article-content");null!=t&&(t.innerHTML="");var e="/blog_contents/"+this.year+"/"+this.month+"/"+this.day+"/"+this.title+".html",n="/blog/"+this.year+"/"+this.month+"/"+this.day+"/"+this.title+"/";this.uri=n.substring(1);for(var a=0;a<this.index.length;a++)if(n==this.index[a].path){this.currentArticleIdx=a;break}var i=e.replace("blog_contents/","").replace(".html","");this.address=this.domain+i;var o=this,r=new XMLHttpRequest;r.open("GET",e,!0),r.onreadystatechange=function(){if(4===r.readyState){var t=r.responseText.substring(0,4);"<!DO"==t||"<hea"==t?window.location.href="/404":o.article=r.responseText}},r.send()}},initCopyButton:function(){this.ClipboardJS=new w.a(".copy-btn");var t=this;this.ClipboardJS.on("success",function(e){var n=e.trigger;n.setAttribute("class",n.getAttribute("class")+" button-clicked"),n.innerHTML=t.copiedBtnMsg,setTimeout(function(){n.setAttribute("class",n.getAttribute("class").replace(" button-clicked","")),n.innerHTML=t.copyBtnMsg},1100),e.clearSelection()}),this.ClipboardJS.on("error",function(t){console.error("Action:",t.action),console.error("Trigger:",t.trigger)})}}},I=T,S=(n("d77f"),n("3f1b"),Object(l["a"])(I,E,_,!1,null,"d21a707c",null));S.options.__file="Blog.vue";var L=S.exports,j=function(){return n.e("chunk-091b").then(n.bind(null,"f066"))},B=function(){return n.e("chunk-2bf5").then(n.bind(null,"1cdb"))},M=function(){return n.e("chunk-1aae").then(n.bind(null,"be4d"))};a["a"].use(m["a"]),a["a"].use(p.a);var J=new m["a"]({mode:"history",routes:[{path:"/",name:"About",component:A},{path:"/main",redirect:"/"},{path:"/about",redirect:"/"},{path:"/home",redirect:"/"},{path:"/blog",name:"Blog",component:L,children:[{path:":year/:month/:day/:title"}]},{path:"/places",name:"Places",component:j},{path:"/musings",name:"Musings",component:B},{path:"/404",name:"NotFound",component:M},{path:"*",redirect:"/404"}]}),O=n("ecee"),P=n("7a55"),q=n("c074"),N=n("f2d1");O["library"].add(q["e"],q["c"],q["f"],q["b"],q["d"],N["a"],q["a"]),a["a"].component("font-awesome-icon",P["FontAwesomeIcon"]),a["a"].config.productionTip=!1,new a["a"]({router:J,render:function(t){return t(u)}}).$mount("#app")},9950:function(t,e,n){},"9ee2":function(t,e,n){},c3b0:function(t,e,n){},d4e1:function(t,e,n){"use strict";var a=n("c3b0"),i=n.n(a);i.a},d77f:function(t,e,n){"use strict";var a=n("9950"),i=n.n(a);i.a}});
//# sourceMappingURL=app.8209151f.js.map