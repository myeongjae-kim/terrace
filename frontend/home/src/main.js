import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

// Loading Webfonts
// Below codes are from https://mytory.net/2016/06/15/webfont-best-practice.html
(function () {
    "use strict";
    // 스매싱 매거진의 '지연된 웹폰트 불러오기' javascript를 안형우가 수정한 것.
    // https://gist.github.com/hdragomir/8f00ce2581795fd7b1b7

    // 한 번 캐시하면 css 파일은 클라이언트 측에 저장한다.
    // 아래 woffPath 가 바뀌면 그 때 다시 받는다.
    // woff base64를 내장한 css
    var woffPath = 'https://cdn.myeongjae.kim/css/fonts_woff.css';
    // woff2 base64를 내장한 css
    var woff2Path = 'https://cdn.myeongjae.kim/css/fonts_woff2.css';

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
        (window.localStorage && localStorage.fontCache)
        || document.cookie.indexOf('fontCache') > -1
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
            window.localStorage
            && localStorage.fontCache
            && (localStorage.fontCacheFile === href)
        );
    }

    /**
     * 실제 css 내용을 넣는 함수
     */
    function injectFontsStylesheet() {

        var supportsWoff2 = (function( win ){
            if( !( "FontFace" in win ) ) {
                return false;
            }

            var f = new FontFace('t', 'url( "data:application/font-woff2;base64,d09GMgABAAAAAADcAAoAAAAAAggAAACWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABk4ALAoUNAE2AiQDCAsGAAQgBSAHIBtvAcieB3aD8wURQ+TZazbRE9HvF5vde4KCYGhiCgq/NKPF0i6UIsZynbP+Xi9Ng+XLbNlmNz/xIBBqq61FIQRJhC/+QA/08PJQJ3sK5TZFMlWzC/iK5GUN40psgqvxwBjBOg6JUSJ7ewyKE2AAaXZrfUB4v+hze37ugJ9d+DeYqiDwVgCawviwVFGnuttkLqIMGivmDg" ) format( "woff2" )', {});
            f.load()['catch'](function() {});

            return f.status == 'loading' || f.status == 'loaded';
        })( window );

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
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
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
        var style = document.createElement('style');
        // style.innerHTML 을 지원하지 않는 IE8을 위한 조치
        style.setAttribute("type", "text/css");
        if (style.styleSheet) {
            style.styleSheet.cssText = text;
        } else {
            style.innerHTML = text;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

}());
