(function(t){function e(e){for(var a,i,s=e[0],l=e[1],c=e[2],d=0,u=[];d<s.length;d++)i=s[d],r[i]&&u.push(r[i][0]),r[i]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);h&&h(e);while(u.length)u.shift()();return o.push.apply(o,c||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var s=n[i];0!==r[s]&&(a=!1)}a&&(o.splice(e--,1),t=l(l.s=n[0]))}return t}var a={},i={app:0},r={app:0},o=[];function s(t){return l.p+"js/"+({}[t]||t)+"."+{"chunk-0870":"f74beb76","chunk-18f9":"45cbea21","chunk-4c8f":"a72df1f6"}[t]+".js"}function l(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.e=function(t){var e=[],n={"chunk-0870":1,"chunk-18f9":1,"chunk-4c8f":1};i[t]?e.push(i[t]):0!==i[t]&&n[t]&&e.push(i[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-0870":"dcdf0b6b","chunk-18f9":"351943b0","chunk-4c8f":"6ef59e79"}[t]+".css",i=l.p+a,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var s=r[o],c=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(c===a||c===i))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){s=d[o],c=s.getAttribute("data-href");if(c===a||c===i)return e()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=e,u.onerror=function(e){var a=e&&e.target&&e.target.src||i,r=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");r.request=a,n(r)},u.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(u)}).then(function(){i[t]=0}));var a=r[t];if(0!==a)if(a)e.push(a[2]);else{var o=new Promise(function(e,n){a=r[t]=[e,n]});e.push(a[2]=o);var c,d=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=s(t),c=function(e){u.onerror=u.onload=null,clearTimeout(h);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+a+": "+i+")");o.type=a,o.request=i,n[1](o)}r[t]=void 0}};var h=setTimeout(function(){c({type:"timeout",target:u})},12e4);u.onerror=u.onload=c,d.appendChild(u)}return Promise.all(e)},l.m=t,l.c=a,l.d=function(t,e,n){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(n,a,function(e){return t[e]}.bind(null,a));return n},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var h=d;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("04f5"),i=n.n(a);i.a},"04f5":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"site-title"}},[n("router-link",{attrs:{to:"/"}},[t._v("Myeongjae Kim")])],1),n("nav",[n("router-link",{attrs:{to:"/"}},[t._v("About")]),n("router-link",{attrs:{to:"/blog"}},[t._v("Blog")]),n("router-link",{attrs:{to:"/musings"}},[t._v("Musings")]),n("router-link",{attrs:{to:"/places"}},[t._v("Places")])],1),n("router-view")],1)},r=[],o={name:"app"},s=o,l=(n("034f"),n("2877")),c=Object(l["a"])(s,i,r,!1,null,null,null);c.options.__file="App.vue";var d=c.exports,u=n("8c4f"),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("img",{attrs:{id:"profileImage",alt:"Profile Image",src:"https://cdn.myeongjae.kim/res/profile.jpeg",width:"200px",height:"200px"}}),t._m(0),n("div",{attrs:{id:"personal-info"}},[n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:["fas","child"]}})],1),n("div",{staticClass:"text"},[t._v("Software Developer")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"map-marker-alt"}})],1),t._m(1)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"user-tie"}})],1),n("div",{staticClass:"text"},[t._v("Résumé")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:["fab","github"]}})],1),t._m(2)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"envelope"}})],1),t._m(3)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"pen-nib"}})],1),t._m(4)])]),t._m(5)])},m=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[n("span",{attrs:{id:"name-eng"}},[t._v("Myeongjae Kim")]),n("span",{attrs:{id:"name-kor"}},[t._v("(김명재)")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"/#/places"}},[t._v("Seoul, Korea")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://github.com/hrzon"}},[t._v("github.com/hrzon")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"mailto:dev@myeongjae.kim"}},[t._v("dev@myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://blog.myeongjae.kim"}},[t._v("blog.myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{attrs:{id:"footer"}},[t._v("\n    If you like my website, you can copy it from\n      "),n("a",{attrs:{href:"https://github.com/hrzon/terrace"}},[t._v("here")]),t._v(".\n  ")])}],v={name:"About"},p=v,f=(n("85db"),Object(l["a"])(p,h,m,!1,null,"2981a833",null));f.options.__file="About.vue";var g=f.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"blog"}},[void 0===t.year?n("div",{attrs:{id:"blog-main"}},[n("h1",{staticClass:"component-title"},[t._v("Articles")]),t._l(t.index,function(e){return n("div",{key:e.path,staticClass:"blog-article-list"},[n("p",{staticClass:"article-info"},[n("a",{staticClass:"article-title",attrs:{href:e.path},on:{click:t.toTheTop}},[t._v(t._s(e.title))]),n("br"),n("span",{staticClass:"article-date"},[t._v(t._s(e.date.year)+" / "+t._s(e.date.month)+" / "+t._s(e.date.day))])])])})],2):n("div",{attrs:{id:"blog-contents"}},[n("article",[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isTitleShown,expression:"isTitleShown"}],staticClass:"article-inner-title"},[n("h1",[n("a",{attrs:{href:t.address}},[t._v(t._s(t.title))])]),n("p",{staticClass:"meta"},[t._v(t._s(t.year)+" / "+t._s(t.month)+" / "+t._s(t.day))])]),n("div",{attrs:{id:"padding-between-title-and-article"}}),n("div",{attrs:{id:"article-content"},domProps:{innerHTML:t._s(t.article)}}),n("div",{attrs:{id:"share-buttons"}},[n("button",{staticClass:"copy-btn",attrs:{"data-clipboard-text":t.address}},[t._v(t._s(t.copyBtnMsg))])])]),n("div",{attrs:{id:"adjacent-articles"}},[t.currentArticleIdx>0?n("div",{attrs:{id:"next-article"}},[n("h4",[t._v("Next Article")]),n("p",[n("a",{attrs:{href:t.index[t.currentArticleIdx-1].path},on:{click:t.toTheTop}},[t._v(t._s(t.index[t.currentArticleIdx-1].title))])])]):t._e(),t.currentArticleIdx<t.index.length-1?n("div",{attrs:{id:"prev-article"}},[n("h4",[t._v("Previous Article")]),n("p",[n("a",{attrs:{href:t.index[t.currentArticleIdx+1].path},on:{click:t.toTheTop}},[t._v(t._s(t.index[t.currentArticleIdx+1].title))])])]):t._e()]),n("div",{attrs:{id:"disqus_thread"}})])])},b=[],A=(n("ac6a"),n("a481"),n("b311")),_=n.n(A),x=n("a70e"),E=n.n(x);n("8159");E.a.registerLanguage("vim",n("3c69")),E.a.registerLanguage("bash",n("f0f8"));var w={name:"Blog",mounted:function(){this.initCopyButton(),this.getPage()},beforeDestroy:function(){this.ClipboardJS.destroy()},updated:function(){var t=document.querySelector("#blog-contents");if(null!=t){var e=t.querySelectorAll("h1");if(e.length<=1)this.isTitleShown=!0;else{this.title=e[1].innerHTML,e[1].style.display="none",this.isTitleShown=!0,this.enableDisqus("myeongjae",this.address.replace(this.domain,""),this.title,this.address);var n=document.querySelector("nav"),a=!1;[].forEach.call(n.querySelectorAll("a"),function(t){a||"#/blog"==t.getAttribute("href")&&(t.setAttribute("class",t.getAttribute("class")+" router-link-exact-active"),a=!0)}),[].forEach.call(document.querySelectorAll("code"),function(t){E.a.highlightBlock(t)})}}else this.isTitleShown=!0},data:function(){return{year:this.$route.params.year,month:this.$route.params.month,day:this.$route.params.day,title:this.$route.params.title,article:"",address:"",domain:"https://blog.myeongjae.kim",copyBtnMsg:"Copy Link to Share",copiedBtnMsg:"Copied to Clipboard",ClipboardJS:null,currentArticleIdx:null,index:[{relativeId:0,title:"[vim/Linux] 13. vim-go와 deoplete-go, Go언어를 위한 플러그인",path:"/#/blog/2017/07/20/vimlinux-13-vim-go와-deoplete-go-go언어를-위한-플러그인",date:{year:"2017",month:"07",monthEng:"July",day:"20",dayEng:"20th"}},{relativeId:1,title:"[vim/Linux] 12. 고요(Goyo), 방해금지 모드 플러그인",path:"/#/blog/2017/07/20/vimlinux-12-고요goyo-방해금지-모드-플러그인",date:{year:"2017",month:"07",monthEng:"July",day:"20",dayEng:"20th"}},{relativeId:2,title:"[vim/Linux] 11. NERD Commenter, 주석 단축키 플러그인",path:"/#/blog/2017/07/19/vimlinux-11-nerd-commenter-주석-단축키-플러그인",date:{year:"2017",month:"07",monthEng:"July",day:"19",dayEng:"19th"}},{relativeId:3,title:"[vim/Linux] 10. deoplete과 clang_complete, 자동 완성 플러그인",path:"/#/blog/2017/07/19/vimlinux-10-deoplete과-clang_complete-자동-완성-플러그인",date:{year:"2017",month:"07",monthEng:"July",day:"19",dayEng:"19th"}},{relativeId:4,title:"[vim/Linux] 9. Synatstic, 문법 체크 플러그인",path:"/#/blog/2017/07/18/vimlinux-9-synatstic-문법-체크-플러그인",date:{year:"2017",month:"07",monthEng:"July",day:"18",dayEng:"18th"}},{relativeId:5,title:"[vim/Linux] 8. UltiSnip과 vim-snippets",path:"/#/blog/2017/07/15/vimlinux-8-ultisnip과-vim-snippets",date:{year:"2017",month:"07",monthEng:"July",day:"15",dayEng:"15th"}},{relativeId:6,title:"[vim/Linux] 7. delimitMate, 괄호 자동 완성 플러그인",path:"/#/blog/2017/07/15/vimlinux-7-delimitmate-괄호-자동-완성-플러그인",date:{year:"2017",month:"07",monthEng:"July",day:"15",dayEng:"15th"}},{relativeId:7,title:"[vim/Linux] 6. vim-multiple-cursor와 vim-smooth-scroll",path:"/#/blog/2017/07/14/vimlinux-6-vim-multiple-cursor와-vim-smooth-scroll",date:{year:"2017",month:"07",monthEng:"July",day:"14",dayEng:"14th"}},{relativeId:8,title:"[vim/Linux] 5. The NERD Tree 설치하기",path:"/#/blog/2017/07/14/vimlinux-5-the-nerd-tree-설치하기",date:{year:"2017",month:"07",monthEng:"July",day:"14",dayEng:"14th"}},{relativeId:9,title:"[vim/Linux] 4. 플러그인 매니저를 설치하고 vim-airline 설치하기",path:"/#/blog/2016/10/06/vimlinux-4-플러그인-매니저를-설치하고-vim-airline-설치하기",date:{year:"2016",month:"10",monthEng:"October",day:"06",dayEng:"6th"}},{relativeId:10,title:"[vim/Linux] 3. vimrc 기본설정",path:"/#/blog/2016/10/02/vimlinux-3-vimrc-기본설정",date:{year:"2016",month:"10",monthEng:"October",day:"02",dayEng:"2nd"}},{relativeId:11,title:"[vim/Linux] 2. Neovim 설치하고 24bit 컬러 적용하기",path:"/#/blog/2016/10/01/vimlinux-2-neovim-설치하고-24bit-컬러-적용하기",date:{year:"2016",month:"10",monthEng:"October",day:"01",dayEng:"1st"}},{relativeId:12,title:"[vim/Linux] 1. vim을 왜 쓰냐고?",path:"/#/blog/2016/10/01/vimlinux-1-vim을-왜-쓰냐고",date:{year:"2016",month:"10",monthEng:"October",day:"01",dayEng:"1st"}},{relativeId:13,title:"마초를 만드는 환경",path:"/#/blog/2016/02/10/마초를-만드는-환경",date:{year:"2016",month:"02",monthEng:"February",day:"10",dayEng:"10th"}},{relativeId:14,title:"남자아이가 마초가 되어가는 과정",path:"/#/blog/2016/02/10/남자아이가-마초가-되어가는-과정",date:{year:"2016",month:"02",monthEng:"February",day:"10",dayEng:"10th"}},{relativeId:15,title:"가장 오래된 작품들이 가장 덜 낡았다",path:"/#/blog/2016/01/19/가장-오래된-작품들이-가장-덜-낡았다",date:{year:"2016",month:"01",monthEng:"January",day:"19",dayEng:"19th"}},{relativeId:16,title:"진정한 교양?",path:"/#/blog/2016/01/14/진정한-교양",date:{year:"2016",month:"01",monthEng:"January",day:"14",dayEng:"14th"}},{relativeId:17,title:"독자는 의무가 아닌 애정의 행로를 따라가야 한다",path:"/#/blog/2016/01/14/독자는-의무가-아닌-애정의-행로를-따라가야-한다",date:{year:"2016",month:"01",monthEng:"January",day:"14",dayEng:"14th"}}],isTitleShown:!1}},watch:{$route:function(t){this.year=t.params.year,this.month=t.params.month,this.day=t.params.day,this.title=t.params.title,this.getPage()}},methods:{toTheTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0},copyUrl:function(t){var e;if(t.srcElement)e=t.srcElement;else{if(!t.target)return;e=t.target}e.setAttribute("class"," button-clicked"),e.innerHTML=this.copiedBtnMsg;var n=this;setTimeout(function(){e.setAttribute("class",null),e.innerHTML=n.copyBtnMsg},1100)},enableDisqus:function(t,e,n,a){"undefined"===typeof DISQUS?function(){var i='var disqus_shortname  = "'+t+'";\nvar disqus_title      = "'+n+'";\nvar disqus_identifier = "'+e+'";\nvar disqus_url        = "'+a+'";\n',r=document.createElement("script");r.type="text/javascript",r.async=!0,r.text=i,(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(r);var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="//"+t+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(o)}():DISQUS.reset({reload:!0,config:function(){this.page.identifier=e,this.page.url=a,this.page.title=n}})},getPage:function(){if(void 0!=this.year){this.isTitleShown=!1;var t=document.querySelector("#article-content");null!=t&&(t.innerHTML="");for(var e="/blog_contents/"+this.year+"/"+this.month+"/"+this.day+"/"+this.title+".html",n="/#/blog/"+this.year+"/"+this.month+"/"+this.day+"/"+this.title,a=0;a<this.index.length;a++)if(n==this.index[a].path){this.currentArticleIdx=a;break}var i=e.replace("blog_contents/","").replace(".html","");this.address=this.domain+i;var r=this,o=new XMLHttpRequest;o.open("GET",e,!0),o.onreadystatechange=function(){if(4===o.readyState){var t=o.responseText.substring(0,4);"<!DO"==t||"<hea"==t?window.location.href="/#/404":r.article=o.responseText}},o.send()}},initCopyButton:function(){this.ClipboardJS=new _.a(".copy-btn");var t=this;this.ClipboardJS.on("success",function(e){var n=e.trigger;n.setAttribute("class",n.getAttribute("class")+" button-clicked"),n.innerHTML=t.copiedBtnMsg,setTimeout(function(){n.setAttribute("class",n.getAttribute("class").replace(" button-clicked","")),n.innerHTML=t.copyBtnMsg},1100),e.clearSelection()}),this.ClipboardJS.on("error",function(t){console.error("Action:",t.action),console.error("Trigger:",t.trigger)})}}},C=w,T=(n("d6e1"),Object(l["a"])(C,y,b,!1,null,"033980eb",null));T.options.__file="Blog.vue";var k=T.exports,S=function(){return n.e("chunk-0870").then(n.bind(null,"f066"))},I=function(){return n.e("chunk-4c8f").then(n.bind(null,"1cdb"))},B=function(){return n.e("chunk-18f9").then(n.bind(null,"be4d"))};a["a"].use(u["a"]);var L=new u["a"]({routes:[{path:"/",name:"About",component:g},{path:"/main",redirect:"/"},{path:"/about",redirect:"/"},{path:"/home",redirect:"/"},{path:"/blog",name:"Blog",component:k,children:[{path:":year/:month/:day/:title"}]},{path:"/places",name:"Places",component:S},{path:"/musings",name:"Musings",component:I},{path:"*",name:"NotFound",component:B}]}),j=n("ecee"),M=n("7a55"),J=n("c074"),q=n("f2d1");j["library"].add(J["e"],J["c"],J["f"],J["b"],J["d"],q["a"],J["a"]),a["a"].component("font-awesome-icon",M["FontAwesomeIcon"]),a["a"].config.productionTip=!1,new a["a"]({router:L,render:function(t){return t(d)}}).$mount("#app"),function(){var t="https://cdn.myeongjae.kim/css/fonts_woff.css",e="https://cdn.myeongjae.kim/css/fonts_woff2.css";function n(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on"+e,n)}function a(t){return window.localStorage&&localStorage.fontCache&&localStorage.fontCacheFile===t}function i(){var n=function(t){if(!("FontFace"in t))return!1;var e=new FontFace("t",'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )',{});return e.load()["catch"](function(){}),"loading"==e.status||"loaded"==e.status}(window),i=t;if(n&&(i=e),a(i))r(localStorage.fontCache);else{var o=new XMLHttpRequest;o.open("GET",i,!0),o.onreadystatechange=function(){4===o.readyState&&(r(o.responseText),localStorage.fontCache=o.responseText,localStorage.fontCacheFile=i)},o.send()}}function r(t){var e=document.createElement("style");e.setAttribute("type","text/css"),e.styleSheet?e.styleSheet.cssText=t:e.innerHTML=t,document.getElementsByTagName("head")[0].appendChild(e)}window.localStorage&&localStorage.fontCache||document.cookie.indexOf("fontCache")>-1?i():n(window,"load",i)}()},"7e0d":function(t,e,n){},"85db":function(t,e,n){"use strict";var a=n("7e0d"),i=n.n(a);i.a},"8c3a":function(t,e,n){},d6e1:function(t,e,n){"use strict";var a=n("8c3a"),i=n.n(a);i.a}});
//# sourceMappingURL=app.39b5e17f.js.map