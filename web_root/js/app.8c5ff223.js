(function(t){function e(e){for(var a,r,c=e[0],s=e[1],u=e[2],l=0,f=[];l<c.length;l++)r=c[l],o[r]&&f.push(o[r][0]),o[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},o={app:0},i=[];function c(t){return s.p+"js/"+({}[t]||t)+"."+{"chunk-5af1":"de805104","chunk-7b2d":"014aa056","chunk-d122":"9ae8fa61"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n={"chunk-5af1":1,"chunk-7b2d":1,"chunk-d122":1};r[t]?e.push(r[t]):0!==r[t]&&n[t]&&e.push(r[t]=new Promise(function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-5af1":"a4ca08d5","chunk-7b2d":"200422dc","chunk-d122":"6429294a"}[t]+".css",r=s.p+a,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var c=o[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===r))return e()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){c=l[i],u=c.getAttribute("data-href");if(u===a||u===r)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var a=e&&e.target&&e.target.src||r,o=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");o.request=a,n(o)},f.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(f)}).then(function(){r[t]=0}));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise(function(e,n){a=o[t]=[e,n]});e.push(a[2]=i);var u,l=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,s.nc&&f.setAttribute("nonce",s.nc),f.src=c(t),u=function(e){f.onerror=f.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+a+": "+r+")");i.type=a,i.request=r,n[1](i)}o[t]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:f})},12e4);f.onerror=f.onload=u,l.appendChild(f)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/",s.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var d=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var a=n("04f5"),r=n.n(a);r.a},"04f5":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"site-title"}},[n("router-link",{attrs:{to:"/"}},[t._v("Myeongjae Kim")])],1),n("nav",[n("router-link",{attrs:{to:"/"}},[t._v("About")]),n("router-link",{attrs:{to:"/blog"}},[t._v("Blog")]),n("router-link",{attrs:{to:"/places"}},[t._v("Places")])],1),n("router-view")],1)},o=[],i={name:"app"},c=i,s=(n("034f"),n("2877")),u=Object(s["a"])(c,r,o,!1,null,null,null);u.options.__file="App.vue";var l=u.exports,f=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("img",{attrs:{id:"profileImage",alt:"Profile Image",src:"https://cdn.myeongjae.kim/res/profile.jpeg",width:"200px",height:"200px"}}),t._m(0),n("div",{attrs:{id:"personal-info"}},[n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"user"}})],1),n("div",{staticClass:"text"},[t._v("Software Engineer")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"map-marker-alt"}})],1),t._m(1)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"user-tie"}})],1),n("div",{staticClass:"text"},[t._v("Résumé")])]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"code-branch"}})],1),t._m(2)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"envelope"}})],1),t._m(3)]),n("div",{staticClass:"record"},[n("div",{staticClass:"icon"},[n("font-awesome-icon",{attrs:{icon:"pen-nib"}})],1),t._m(4)])]),t._m(5)])},h=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[n("span",{attrs:{id:"name-eng"}},[t._v("Myeongjae Kim")]),n("span",{attrs:{id:"name-kor"}},[t._v("(김명재)")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"/#/places"}},[t._v("Seoul, Korea")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://github.com/hrzon"}},[t._v("github.com/hrzon")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"mailto:dev@myeongjae.kim"}},[t._v("dev@myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text"},[n("a",{attrs:{href:"https://blog.myeongjae.kim"}},[t._v("blog.myeongjae.kim")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("footer",{attrs:{id:"footer"}},[t._v("\n    If you like my website, you can copy it from\n      "),n("a",{attrs:{href:"https://github.com/hrzon/terrace"}},[t._v("here")]),t._v(".\n  ")])}],p={name:"About"},m=p,v=(n("b869"),Object(s["a"])(m,d,h,!1,null,"014fa808",null));v.options.__file="About.vue";var g=v.exports,A=function(){return n.e("chunk-7b2d").then(n.bind(null,"3d68"))},b=function(){return n.e("chunk-5af1").then(n.bind(null,"f066"))},y=function(){return n.e("chunk-d122").then(n.bind(null,"be4d"))};a["a"].use(f["a"]);var _=new f["a"]({routes:[{path:"/",name:"About",component:g},{path:"/main",redirect:"/"},{path:"/about",redirect:"/"},{path:"/home",redirect:"/"},{path:"/blog",name:"Blog",component:A,children:[{path:":year/:month/:day/:title"}]},{path:"/places",name:"Places",component:b},{path:"*",name:"NotFound",component:y}]}),w=n("ecee"),C=n("7a55"),k=n("c074");w["library"].add(k["e"],k["c"],k["a"],k["f"],k["b"],k["d"]),a["a"].component("font-awesome-icon",C["FontAwesomeIcon"]),a["a"].config.productionTip=!1,new a["a"]({router:_,render:function(t){return t(l)}}).$mount("#app"),function(){var t="https://cdn.myeongjae.kim/css/fonts_woff.css",e="https://cdn.myeongjae.kim/css/fonts_woff2.css";function n(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent&&t.attachEvent("on"+e,n)}function a(t){return window.localStorage&&localStorage.fontCache&&localStorage.fontCacheFile===t}function r(){var n=function(t){if(!("FontFace"in t))return!1;var e=new FontFace("t",'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )',{});return e.load()["catch"](function(){}),"loading"==e.status||"loaded"==e.status}(window),r=t;if(n&&(r=e),a(r))o(localStorage.fontCache);else{var i=new XMLHttpRequest;i.open("GET",r,!0),i.onreadystatechange=function(){4===i.readyState&&(o(i.responseText),localStorage.fontCache=i.responseText,localStorage.fontCacheFile=r)},i.send()}}function o(t){var e=document.createElement("style");e.setAttribute("type","text/css"),e.styleSheet?e.styleSheet.cssText=t:e.innerHTML=t,document.getElementsByTagName("head")[0].appendChild(e)}window.localStorage&&localStorage.fontCache||document.cookie.indexOf("fontCache")>-1?r():n(window,"load",r)}()},b869:function(t,e,n){"use strict";var a=n("e30c"),r=n.n(a);r.a},e30c:function(t,e,n){}});
//# sourceMappingURL=app.8c5ff223.js.map