(function(e){function t(t){for(var r,c,i=t[0],s=t[1],l=t[2],p=0,f=[];p<i.length;p++)c=i[p],a[c]&&f.push(a[c][0]),a[c]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var s=n[i];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},a={app:0},o=[];function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var u=s;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("04f5"),a=n.n(r);a.a},"04f5":function(e,t,n){},"05bb":function(e,t,n){"use strict";var r=n("07ce"),a=n.n(r);a.a},"07ce":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"site-title"}},[n("router-link",{attrs:{to:"/"}},[e._v("Myeongjae Kim")])],1),n("nav",[n("router-link",{attrs:{to:"/"}},[e._v("About")]),n("router-link",{attrs:{to:"/blog"}},[e._v("Blog")]),n("router-link",{attrs:{to:"/places"}},[e._v("Places")])],1),n("router-view")],1)},o=[],c={name:"app"},i=c,s=(n("034f"),n("2877")),l=Object(s["a"])(i,a,o,!1,null,null,null);l.options.__file="App.vue";var u=l.exports,p=n("8c4f"),f=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},v=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("img",{attrs:{id:"profileImage",alt:"myeongjae.kim@icloud.com from gravatar.com",src:"https://www.gravatar.com/avatar/60a42ec05e4e6f2625aba6ff7f44ee02?s=400",width:"200px",height:"200px"}}),n("h1",[e._v("Greetings!")]),n("p",[e._v("Nice to meet you :)")]),n("p",[e._v("안녕하세요?")])])}],m={name:"About"},d=m,b=(n("05bb"),Object(s["a"])(d,f,v,!1,null,"10f4cbcb",null));b.options.__file="About.vue";var _=b.exports,h=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"blog"},[n("h1",[e._v("Blog")]),n("p",[e._v("Under development.")]),n("img",{attrs:{src:"https://s3.ap-northeast-2.amazonaws.com/cdn.myeongjae.kim/res/logo1.jpg"}}),n("img",{attrs:{src:"https://s3.ap-northeast-2.amazonaws.com/cdn.myeongjae.kim/credit.jpg"}})])}],j={name:"Blog"},w=j,y=(n("5be3"),Object(s["a"])(w,h,g,!1,null,"536d8fb1",null));y.options.__file="Blog.vue";var x=y.exports,k=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},O=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"places"},[n("h1",[e._v("Places")]),n("p",[e._v("where I have been")]),n("div",{attrs:{id:"map-wrapper"}},[n("iframe",{attrs:{id:"map",src:"https://api.mapbox.com/styles/v1/myeongjae/cjl07pcz14j9t2sqmsp0swqhg.html?fresh=true&title=true&access_token=pk.eyJ1IjoibXllb25namFlIiwiYSI6ImNqbDAzdWFhZjEwd2kza3Bncmo0emFtM2wifQ.j2Y4BLsTivJxT7BU_bWFKg"}})])])}],P={name:"Places"},B=P,E=(n("6269"),Object(s["a"])(B,k,O,!1,null,"186da064",null));E.options.__file="Places.vue";var S=E.exports;r["a"].use(p["a"]);var $=new p["a"]({routes:[{path:"/",name:"About",component:_},{path:"/blog",name:"Blog",component:x},{path:"/places",name:"Places",component:S}]}),I=n("27d6"),A=n.n(I);r["a"].config.productionTip=!1,new r["a"]({router:$,render:function(e){return e(u)}}).$mount("#app"),function(){A.a.load({google:{families:["Source Sans Pro:300,700","Inconsolata"]}})}()},"5be3":function(e,t,n){"use strict";var r=n("c35c"),a=n.n(r);a.a},6269:function(e,t,n){"use strict";var r=n("6b82"),a=n.n(r);a.a},"6b82":function(e,t,n){},c35c:function(e,t,n){}});
//# sourceMappingURL=app.a6c4122f.js.map