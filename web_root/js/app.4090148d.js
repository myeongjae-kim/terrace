(function(t){function e(e){for(var a,r,s=e[0],c=e[1],l=e[2],u=0,d=[];u<s.length;u++)r=s[u],i[r]&&d.push(i[r][0]),i[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);h&&h(e);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,r=1;r<n.length;r++){var s=n[r];0!==i[s]&&(a=!1)}a&&(o.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},r={app:0},i={app:0},o=[];function s(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-06bb":"c2ebd4ba","chunk-158f":"693f84c6","chunk-6be3":"16ebd578"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-06bb":1,"chunk-158f":1,"chunk-6be3":1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-06bb":"9478247c","chunk-158f":"766c589f","chunk-6be3":"fd2ed9e7"}[t]+".css",r=c.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var s=i[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===a||l===r))return e()}var u=document.getElementsByTagName("style");for(o=0;o<u.length;o++){s=u[o],l=s.getAttribute("data-href");if(l===a||l===r)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||r,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.request=a,n(i)},d.href=r;var h=document.getElementsByTagName("head")[0];h.appendChild(d)}).then(function(){r[t]=0}));var a=i[t];if(0!==a)if(a)e.push(a[2]);else{var o=new Promise(function(e,n){a=i[t]=[e,n]});e.push(a[2]=o);var l,u=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(t),l=function(e){d.onerror=d.onload=null,clearTimeout(h);var n=i[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,o=new Error("Loading chunk "+t+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,n[1](o)}i[t]=void 0}};var h=setTimeout(function(){l({type:"timeout",target:d})},12e4);d.onerror=d.onload=l,u.appendChild(d)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var h=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("04f5"),r=n.n(a);r.a},"04f5":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"site-title"}},[n("router-link",{attrs:{to:"/"}},[t._v("Myeongjae Kim")])],1),n("nav",[n("router-link",{attrs:{to:"/"}},[t._v("About")]),n("router-link",{attrs:{to:"/blog"}},[t._v("Blog")]),n("router-link",{attrs:{to:"/musings"}},[t._v("Musings")]),n("router-link",{attrs:{to:"/places"}},[t._v("Places")])],1),n("router-view")],1)},i=[],o={name:"app"},s=o,c=(n("034f"),n("2877")),l=Object(c["a"])(s,r,i,!1,null,null,null);l.options.__file="App.vue";var u=l.exports,d=n("8c4f"),h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("img",{attrs:{id:"profileImage",alt:"Profile Image",src:"https://cdn.myeongjae.kim/res/profile.jpeg",width:"200px",height:"200px"}}),t._m(0),n("div",{attrs:{id:"personal-info"}},[n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:["fas","child"]}})],1),n("div",{staticClass:"text"},[t._v("Software Developer")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"map-marker-alt"}})],1),t._m(1)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"user-tie"}})],1),n("div",{staticClass:"text"},[t._v("Résumé")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:["fab","github"]}})],1),t._m(2)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"envelope"}})],1),t._m(3)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"pen-nib"}})],1),t._m(4)])]),t._m(5)])},m=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[n("span",{attrs:{id:"name-eng"}},[t._v("Myeongjae Kim")]),n("span",{attrs:{id:"name-kor"}},[t._v("(김명재)")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"/#/places"}},[t._v("Seoul, Korea")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://github.com/hrzon"}},[t._v("github.com/hrzon")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"mailto:dev@myeongjae.kim"}},[t._v("dev@myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://blog.myeongjae.kim"}},[t._v("blog.myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{attrs:{id:"footer"}},[t._v("\n    If you like my website, you can copy it from\n      "),n("a",{attrs:{href:"https://github.com/hrzon/terrace"}},[t._v("here")]),t._v(".\n  ")])}],f={name:"About"},p=f,v=(n("85db"),Object(c["a"])(p,h,m,!1,null,"2981a833",null));v.options.__file="About.vue";var g=v.exports,b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"blog"}},[void 0==t.year?n("div",{attrs:{id:"blog-main"}},[n("h1",{staticClass:"component-title"},[t._v("Articles")]),t._l(t.index,function(e){return n("div",{key:e.path,attrs:{id:"blog-article-list"}},[n("p",[n("a",{staticClass:"article-title",attrs:{href:e.path}},[t._v(t._s(e.title))]),n("br"),n("span",{staticClass:"article-date"},[t._v(t._s(e.date.year)+" / "+t._s(e.date.month)+" / "+t._s(e.date.day))])])])}),n("p",[t._v("(Under development)")])],2):n("div",{attrs:{id:"blog-contents"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.isTitleShown,expression:"isTitleShown"}],staticClass:"blog-title"},[n("h1",[t._v(t._s(t.title))]),n("p",{staticClass:"meta"},[t._v(t._s(t.year)+" / "+t._s(t.month)+" / "+t._s(t.day))])]),n("div",{attrs:{id:"articleID"},domProps:{innerHTML:t._s(t.article)}}),n("p",[t._v(t._s(t.address))]),n("div",{attrs:{id:"disqus_thread"}})])])},y=[],_=(n("ac6a"),n("a481"),{name:"Blog",mounted:function(){this.getPage()},updated:function(){var t=document.querySelector("#blog-contents");if(null!=t){var e=t.querySelectorAll("h1");if(e.length<=1)this.isTitleShown=!0;else{this.title=e[1].innerHTML,e[1].remove(),this.isTitleShown=!0,this.enableDisqus("myeongjae",this.address.replace(this.domain,""),this.title,this.address);var n=document.querySelector("nav"),a=!1;[].forEach.call(n.querySelectorAll("a"),function(t){a||"#/blog"==t.getAttribute("href")&&(t.setAttribute("class",t.getAttribute("class")+" router-link-exact-active"),a=!0)})}}else this.isTitleShown=!0},data:function(){return{year:this.$route.params.year,month:this.$route.params.month,day:this.$route.params.day,title:this.$route.params.title,article:"",address:"",domain:"https://blog.myeongjae.kim",index:[{title:" 디스쿠스 테스트용 아티클입니다.",path:"/#/blog/2018/09/14/disqus-test",date:{year:"2018",month:"09",monthEng:"September",day:"14",dayEng:"14th"}},{title:"This is test document2",path:"/#/blog/2018/09/11/this-is-test-document2",date:{year:"2018",month:"09",monthEng:"September",day:"11",dayEng:"11st"}},{title:"This is test document1",path:"/#/blog/2018/09/11/this-is-test-document1",date:{year:"2018",month:"09",monthEng:"September",day:"11",dayEng:"11st"}},{title:"테스트 3",path:"/#/blog/2018/09/11/test-3",date:{year:"2018",month:"09",monthEng:"September",day:"11",dayEng:"11st"}},{title:"temp.html",path:"/#/blog/2018/09/10/temp",date:{year:"2018",month:"09",monthEng:"September",day:"10",dayEng:"10th"}}],isTitleShown:!1}},watch:{$route:function(t){this.year=t.params.year,this.month=t.params.month,this.day=t.params.day,this.title=t.params.title,this.getPage()}},methods:{enableDisqus:function(t,e,n,a){"undefined"===typeof DISQUS?function(){var r='var disqus_shortname  = "'+t+'";\nvar disqus_title      = "'+n+'";\nvar disqus_identifier = "'+e+'";\nvar disqus_url        = "'+a+'";\n',i=document.createElement("script");i.type="text/javascript",i.async=!0,i.text=r,(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(i);var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src="//"+t+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(o)}():DISQUS.reset({reload:!0,config:function(){this.page.identifier=e,this.page.url=a,this.page.title=n}})},getPage:function(){if(void 0!=this.year){this.isTitleShown=!1;var t="/blog_contents/"+this.year+"/"+this.month+"/"+this.day+"/"+this.title+".html",e=t.replace("blog_contents/","").replace(".html","");this.address=this.domain+e;var n=this,a=new XMLHttpRequest;a.open("GET",t,!0),a.onreadystatechange=function(){if(4===a.readyState){var t=a.responseText.substring(0,4);"<!DO"==t||"<hea"==t?window.location.href="/#/404":n.article=a.responseText}},a.send()}}}}),A=_,w=(n("92c3"),Object(c["a"])(A,b,y,!1,null,"5f0bb02a",null));w.options.__file="Blog.vue";var E=w.exports,C=function(){return n.e("chunk-06bb").then(n.bind(null,"f066"))},S=function(){return n.e("chunk-6be3").then(n.bind(null,"1cdb"))},k=function(){return n.e("chunk-158f").then(n.bind(null,"be4d"))};a["a"].use(d["a"]);var T=new d["a"]({routes:[{path:"/",name:"About",component:g},{path:"/main",redirect:"/"},{path:"/about",redirect:"/"},{path:"/home",redirect:"/"},{path:"/blog",name:"Blog",component:E,children:[{path:":year/:month/:day/:title"}]},{path:"/places",name:"Places",component:C},{path:"/musings",name:"Musings",component:S},{path:"*",name:"NotFound",component:k}]}),x=n("ecee"),j=n("7a55"),q=n("c074"),B=n("f2d1");x["library"].add(q["e"],q["c"],q["f"],q["b"],q["d"],B["a"],q["a"]),a["a"].component("font-awesome-icon",j["FontAwesomeIcon"]),a["a"].config.productionTip=!1,new a["a"]({router:T,render:function(t){return t(u)}}).$mount("#app"),function(){var t="https://cdn.myeongjae.kim/css/fonts_woff.css",e="https://cdn.myeongjae.kim/css/fonts_woff2.css";function n(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on"+e,n)}function a(t){return window.localStorage&&localStorage.fontCache&&localStorage.fontCacheFile===t}function r(){var n=function(t){if(!("FontFace"in t))return!1;var e=new FontFace("t",'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )',{});return e.load()["catch"](function(){}),"loading"==e.status||"loaded"==e.status}(window),r=t;if(n&&(r=e),a(r))i(localStorage.fontCache);else{var o=new XMLHttpRequest;o.open("GET",r,!0),o.onreadystatechange=function(){4===o.readyState&&(i(o.responseText),localStorage.fontCache=o.responseText,localStorage.fontCacheFile=r)},o.send()}}function i(t){var e=document.createElement("style");e.setAttribute("type","text/css"),e.styleSheet?e.styleSheet.cssText=t:e.innerHTML=t,document.getElementsByTagName("head")[0].appendChild(e)}window.localStorage&&localStorage.fontCache||document.cookie.indexOf("fontCache")>-1?r():n(window,"load",r)}()},"7e0d":function(t,e,n){},"85db":function(t,e,n){"use strict";var a=n("7e0d"),r=n.n(a);r.a},"92c3":function(t,e,n){"use strict";var a=n("b2de"),r=n.n(a);r.a},b2de:function(t,e,n){}});
//# sourceMappingURL=app.4090148d.js.map