<template>
  <div class="wrapper">
    <div class="not-found-container">
      <div id="not-found">
        <p class="text color-text-flow" id="title404">404</p>
        <p class="text color-text-flow">NOT FOUND</p>
      </div>
      <div id="poem-flower">
        <p class="text color-text-flow">모든 경계에는 꽃이 핀다.</p>
        <p class="text color-text-flow">- 함민복, [꽃]</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted: function() {
    [].forEach.call(document.querySelectorAll('.text'), function(el) {
      var origin = el.innerHTML;
      var new_html = "";
      for(var i = 0; i < origin.length; i++)
        new_html += "<span>" + origin[i] + "</span>";
      el.innerHTML = new_html;
    });

    // Loading Webfonts
    // Below codes are from https://mytory.net/2016/06/15/webfont-best-practice.html
    (function () {
      "use strict";
      // 스매싱 매거진의 '지연된 웹폰트 불러오기' javascript를 안형우가 수정한 것.
      // https://gist.github.com/hdragomir/8f00ce2581795fd7b1b7

      // 한 번 캐시하면 css 파일은 클라이언트 측에 저장한다.
      // 아래 woffPath 가 바뀌면 그 때 다시 받는다.
      // woff base64를 내장한 css
      var woffPath = 'https://cdn.myeongjae.kim/css/IropkeBatangMSubset.woff.css';
      // woff2 base64를 내장한 css
      var woff2Path = 'https://cdn.myeongjae.kim/css/IropkeBatangMSubset.woff2.css';

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



  }
}
</script>

<style>
/* The rainbow coloring codes are from https://codepen.io/joashp/pen/dYXNwj */
.color-text-flow,
.color-text-flow-hover:hover {
  /*
   * Elements settings
   */
}
.color-text-flow span,
.color-text-flow-hover:hover span {
  -webkit-animation-name: color-text-flow-keys;
  animation-name: color-text-flow-keys;
  -webkit-animation-duration: 50s;
  animation-duration: 50s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
@-webkit-keyframes color-text-flow-keys {
  0% {
    color: #d65c97;
  }
  5% {
    color: #5cd666;
  }
  10% {
    color: #a55cd6;
  }
  15.0% {
    color: #5c7cd6;
  }
  20% {
    color: #d65c7a;
  }
  25% {
    color: #81d65c;
  }
  30.0% {
    color: #835cd6;
  }
  35% {
    color: #685cd6;
  }
  40% {
    color: #5c9dd6;
  }
  45% {
    color: #5cd670;
  }
  50% {
    color: #d6625c;
  }
  55.0% {
    color: #d6835c;
  }
  60.0% {
    color: #d6605c;
  }
  65% {
    color: #be5cd6;
  }
  70% {
    color: #5c8dd6;
  }
  75% {
    color: #95d65c;
  }
  80% {
    color: #d69d5c;
  }
  85.0% {
    color: #d65c81;
  }
  90% {
    color: #5cd666;
  }
  95% {
    color: #d67e5c;
  }
  100% {
    color: #64d65c;
  }
}
@keyframes color-text-flow-keys {
  0% {
    color: #d65c97;
  }
  5% {
    color: #5cd666;
  }
  10% {
    color: #a55cd6;
  }
  15.0% {
    color: #5c7cd6;
  }
  20% {
    color: #d65c7a;
  }
  25% {
    color: #81d65c;
  }
  30.0% {
    color: #835cd6;
  }
  35% {
    color: #685cd6;
  }
  40% {
    color: #5c9dd6;
  }
  45% {
    color: #5cd670;
  }
  50% {
    color: #d6625c;
  }
  55.0% {
    color: #d6835c;
  }
  60.0% {
    color: #d6605c;
  }
  65% {
    color: #be5cd6;
  }
  70% {
    color: #5c8dd6;
  }
  75% {
    color: #95d65c;
  }
  80% {
    color: #d69d5c;
  }
  85.0% {
    color: #d65c81;
  }
  90% {
    color: #5cd666;
  }
  95% {
    color: #d67e5c;
  }
  100% {
    color: #64d65c;
  }
}
.color-text-flow span:nth-of-type(1),
.color-text-flow-hover:hover span:nth-of-type(1) {
  -webkit-animation-delay: -19.8s;
  animation-delay: -19.8s;
}
.color-text-flow span:nth-of-type(2),
.color-text-flow-hover:hover span:nth-of-type(2) {
  -webkit-animation-delay: -19.6s;
  animation-delay: -19.6s;
}
.color-text-flow span:nth-of-type(3),
.color-text-flow-hover:hover span:nth-of-type(3) {
  -webkit-animation-delay: -19.4s;
  animation-delay: -19.4s;
}
.color-text-flow span:nth-of-type(4),
.color-text-flow-hover:hover span:nth-of-type(4) {
  -webkit-animation-delay: -19.2s;
  animation-delay: -19.2s;
}
.color-text-flow span:nth-of-type(5),
.color-text-flow-hover:hover span:nth-of-type(5) {
  -webkit-animation-delay: -19s;
  animation-delay: -19s;
}
.color-text-flow span:nth-of-type(6),
.color-text-flow-hover:hover span:nth-of-type(6) {
  -webkit-animation-delay: -18.8s;
  animation-delay: -18.8s;
}
.color-text-flow span:nth-of-type(7),
.color-text-flow-hover:hover span:nth-of-type(7) {
  -webkit-animation-delay: -18.6s;
  animation-delay: -18.6s;
}
.color-text-flow span:nth-of-type(8),
.color-text-flow-hover:hover span:nth-of-type(8) {
  -webkit-animation-delay: -18.4s;
  animation-delay: -18.4s;
}
.color-text-flow span:nth-of-type(9),
.color-text-flow-hover:hover span:nth-of-type(9) {
  -webkit-animation-delay: -18.2s;
  animation-delay: -18.2s;
}
.color-text-flow span:nth-of-type(10),
.color-text-flow-hover:hover span:nth-of-type(10) {
  -webkit-animation-delay: -18s;
  animation-delay: -18s;
}
.color-text-flow span:nth-of-type(11),
.color-text-flow-hover:hover span:nth-of-type(11) {
  -webkit-animation-delay: -17.8s;
  animation-delay: -17.8s;
}
.color-text-flow span:nth-of-type(12),
.color-text-flow-hover:hover span:nth-of-type(12) {
  -webkit-animation-delay: -17.6s;
  animation-delay: -17.6s;
}
.color-text-flow span:nth-of-type(13),
.color-text-flow-hover:hover span:nth-of-type(13) {
  -webkit-animation-delay: -17.4s;
  animation-delay: -17.4s;
}
.color-text-flow span:nth-of-type(14),
.color-text-flow-hover:hover span:nth-of-type(14) {
  -webkit-animation-delay: -17.2s;
  animation-delay: -17.2s;
}
.color-text-flow span:nth-of-type(15),
.color-text-flow-hover:hover span:nth-of-type(15) {
  -webkit-animation-delay: -17s;
  animation-delay: -17s;
}
.color-text-flow span:nth-of-type(16),
.color-text-flow-hover:hover span:nth-of-type(16) {
  -webkit-animation-delay: -16.8s;
  animation-delay: -16.8s;
}
.color-text-flow span:nth-of-type(17),
.color-text-flow-hover:hover span:nth-of-type(17) {
  -webkit-animation-delay: -16.6s;
  animation-delay: -16.6s;
}
.color-text-flow span:nth-of-type(18),
.color-text-flow-hover:hover span:nth-of-type(18) {
  -webkit-animation-delay: -16.4s;
  animation-delay: -16.4s;
}
.color-text-flow span:nth-of-type(19),
.color-text-flow-hover:hover span:nth-of-type(19) {
  -webkit-animation-delay: -16.2s;
  animation-delay: -16.2s;
}
.color-text-flow span:nth-of-type(20),
.color-text-flow-hover:hover span:nth-of-type(20) {
  -webkit-animation-delay: -16s;
  animation-delay: -16s;
}
.color-text-flow span:nth-of-type(21),
.color-text-flow-hover:hover span:nth-of-type(21) {
  -webkit-animation-delay: -15.8s;
  animation-delay: -15.8s;
}
.color-text-flow span:nth-of-type(22),
.color-text-flow-hover:hover span:nth-of-type(22) {
  -webkit-animation-delay: -15.6s;
  animation-delay: -15.6s;
}
.color-text-flow span:nth-of-type(23),
.color-text-flow-hover:hover span:nth-of-type(23) {
  -webkit-animation-delay: -15.4s;
  animation-delay: -15.4s;
}
.color-text-flow span:nth-of-type(24),
.color-text-flow-hover:hover span:nth-of-type(24) {
  -webkit-animation-delay: -15.2s;
  animation-delay: -15.2s;
}
.color-text-flow span:nth-of-type(25),
.color-text-flow-hover:hover span:nth-of-type(25) {
  -webkit-animation-delay: -15s;
  animation-delay: -15s;
}
.color-text-flow span:nth-of-type(26),
.color-text-flow-hover:hover span:nth-of-type(26) {
  -webkit-animation-delay: -14.8s;
  animation-delay: -14.8s;
}
.color-text-flow span:nth-of-type(27),
.color-text-flow-hover:hover span:nth-of-type(27) {
  -webkit-animation-delay: -14.6s;
  animation-delay: -14.6s;
}
.color-text-flow span:nth-of-type(28),
.color-text-flow-hover:hover span:nth-of-type(28) {
  -webkit-animation-delay: -14.4s;
  animation-delay: -14.4s;
}
.color-text-flow span:nth-of-type(29),
.color-text-flow-hover:hover span:nth-of-type(29) {
  -webkit-animation-delay: -14.2s;
  animation-delay: -14.2s;
}
.color-text-flow span:nth-of-type(30),
.color-text-flow-hover:hover span:nth-of-type(30) {
  -webkit-animation-delay: -14s;
  animation-delay: -14s;
}
.color-text-flow span:nth-of-type(31),
.color-text-flow-hover:hover span:nth-of-type(31) {
  -webkit-animation-delay: -13.8s;
  animation-delay: -13.8s;
}
.color-text-flow span:nth-of-type(32),
.color-text-flow-hover:hover span:nth-of-type(32) {
  -webkit-animation-delay: -13.6s;
  animation-delay: -13.6s;
}
.color-text-flow span:nth-of-type(33),
.color-text-flow-hover:hover span:nth-of-type(33) {
  -webkit-animation-delay: -13.4s;
  animation-delay: -13.4s;
}
.color-text-flow span:nth-of-type(34),
.color-text-flow-hover:hover span:nth-of-type(34) {
  -webkit-animation-delay: -13.2s;
  animation-delay: -13.2s;
}
.color-text-flow span:nth-of-type(35),
.color-text-flow-hover:hover span:nth-of-type(35) {
  -webkit-animation-delay: -13s;
  animation-delay: -13s;
}
.color-text-flow span:nth-of-type(36),
.color-text-flow-hover:hover span:nth-of-type(36) {
  -webkit-animation-delay: -12.8s;
  animation-delay: -12.8s;
}
.color-text-flow span:nth-of-type(37),
.color-text-flow-hover:hover span:nth-of-type(37) {
  -webkit-animation-delay: -12.6s;
  animation-delay: -12.6s;
}
.color-text-flow span:nth-of-type(38),
.color-text-flow-hover:hover span:nth-of-type(38) {
  -webkit-animation-delay: -12.4s;
  animation-delay: -12.4s;
}
.color-text-flow span:nth-of-type(39),
.color-text-flow-hover:hover span:nth-of-type(39) {
  -webkit-animation-delay: -12.2s;
  animation-delay: -12.2s;
}
.color-text-flow span:nth-of-type(40),
.color-text-flow-hover:hover span:nth-of-type(40) {
  -webkit-animation-delay: -12s;
  animation-delay: -12s;
}
.color-text-flow span:nth-of-type(41),
.color-text-flow-hover:hover span:nth-of-type(41) {
  -webkit-animation-delay: -11.8s;
  animation-delay: -11.8s;
}
.color-text-flow span:nth-of-type(42),
.color-text-flow-hover:hover span:nth-of-type(42) {
  -webkit-animation-delay: -11.6s;
  animation-delay: -11.6s;
}
.color-text-flow span:nth-of-type(43),
.color-text-flow-hover:hover span:nth-of-type(43) {
  -webkit-animation-delay: -11.4s;
  animation-delay: -11.4s;
}
.color-text-flow span:nth-of-type(44),
.color-text-flow-hover:hover span:nth-of-type(44) {
  -webkit-animation-delay: -11.2s;
  animation-delay: -11.2s;
}
.color-text-flow span:nth-of-type(45),
.color-text-flow-hover:hover span:nth-of-type(45) {
  -webkit-animation-delay: -11s;
  animation-delay: -11s;
}
.color-text-flow span:nth-of-type(46),
.color-text-flow-hover:hover span:nth-of-type(46) {
  -webkit-animation-delay: -10.8s;
  animation-delay: -10.8s;
}
.color-text-flow span:nth-of-type(47),
.color-text-flow-hover:hover span:nth-of-type(47) {
  -webkit-animation-delay: -10.6s;
  animation-delay: -10.6s;
}
.color-text-flow span:nth-of-type(48),
.color-text-flow-hover:hover span:nth-of-type(48) {
  -webkit-animation-delay: -10.4s;
  animation-delay: -10.4s;
}
.color-text-flow span:nth-of-type(49),
.color-text-flow-hover:hover span:nth-of-type(49) {
  -webkit-animation-delay: -10.2s;
  animation-delay: -10.2s;
}
.color-text-flow span:nth-of-type(50),
.color-text-flow-hover:hover span:nth-of-type(50) {
  -webkit-animation-delay: -10s;
  animation-delay: -10s;
}
.color-text-flow span:nth-of-type(51),
.color-text-flow-hover:hover span:nth-of-type(51) {
  -webkit-animation-delay: -9.8s;
  animation-delay: -9.8s;
}
.color-text-flow span:nth-of-type(52),
.color-text-flow-hover:hover span:nth-of-type(52) {
  -webkit-animation-delay: -9.6s;
  animation-delay: -9.6s;
}
.color-text-flow span:nth-of-type(53),
.color-text-flow-hover:hover span:nth-of-type(53) {
  -webkit-animation-delay: -9.4s;
  animation-delay: -9.4s;
}
.color-text-flow span:nth-of-type(54),
.color-text-flow-hover:hover span:nth-of-type(54) {
  -webkit-animation-delay: -9.2s;
  animation-delay: -9.2s;
}
.color-text-flow span:nth-of-type(55),
.color-text-flow-hover:hover span:nth-of-type(55) {
  -webkit-animation-delay: -9s;
  animation-delay: -9s;
}
.color-text-flow span:nth-of-type(56),
.color-text-flow-hover:hover span:nth-of-type(56) {
  -webkit-animation-delay: -8.8s;
  animation-delay: -8.8s;
}
.color-text-flow span:nth-of-type(57),
.color-text-flow-hover:hover span:nth-of-type(57) {
  -webkit-animation-delay: -8.6s;
  animation-delay: -8.6s;
}
.color-text-flow span:nth-of-type(58),
.color-text-flow-hover:hover span:nth-of-type(58) {
  -webkit-animation-delay: -8.4s;
  animation-delay: -8.4s;
}
.color-text-flow span:nth-of-type(59),
.color-text-flow-hover:hover span:nth-of-type(59) {
  -webkit-animation-delay: -8.2s;
  animation-delay: -8.2s;
}
.color-text-flow span:nth-of-type(60),
.color-text-flow-hover:hover span:nth-of-type(60) {
  -webkit-animation-delay: -8s;
  animation-delay: -8s;
}
.color-text-flow span:nth-of-type(61),
.color-text-flow-hover:hover span:nth-of-type(61) {
  -webkit-animation-delay: -7.8s;
  animation-delay: -7.8s;
}
.color-text-flow span:nth-of-type(62),
.color-text-flow-hover:hover span:nth-of-type(62) {
  -webkit-animation-delay: -7.6s;
  animation-delay: -7.6s;
}
.color-text-flow span:nth-of-type(63),
.color-text-flow-hover:hover span:nth-of-type(63) {
  -webkit-animation-delay: -7.4s;
  animation-delay: -7.4s;
}
.color-text-flow span:nth-of-type(64),
.color-text-flow-hover:hover span:nth-of-type(64) {
  -webkit-animation-delay: -7.2s;
  animation-delay: -7.2s;
}
.color-text-flow span:nth-of-type(65),
.color-text-flow-hover:hover span:nth-of-type(65) {
  -webkit-animation-delay: -7s;
  animation-delay: -7s;
}
.color-text-flow span:nth-of-type(66),
.color-text-flow-hover:hover span:nth-of-type(66) {
  -webkit-animation-delay: -6.8s;
  animation-delay: -6.8s;
}
.color-text-flow span:nth-of-type(67),
.color-text-flow-hover:hover span:nth-of-type(67) {
  -webkit-animation-delay: -6.6s;
  animation-delay: -6.6s;
}
.color-text-flow span:nth-of-type(68),
.color-text-flow-hover:hover span:nth-of-type(68) {
  -webkit-animation-delay: -6.4s;
  animation-delay: -6.4s;
}
.color-text-flow span:nth-of-type(69),
.color-text-flow-hover:hover span:nth-of-type(69) {
  -webkit-animation-delay: -6.2s;
  animation-delay: -6.2s;
}
.color-text-flow span:nth-of-type(70),
.color-text-flow-hover:hover span:nth-of-type(70) {
  -webkit-animation-delay: -6s;
  animation-delay: -6s;
}
.color-text-flow span:nth-of-type(71),
.color-text-flow-hover:hover span:nth-of-type(71) {
  -webkit-animation-delay: -5.8s;
  animation-delay: -5.8s;
}
.color-text-flow span:nth-of-type(72),
.color-text-flow-hover:hover span:nth-of-type(72) {
  -webkit-animation-delay: -5.6s;
  animation-delay: -5.6s;
}
.color-text-flow span:nth-of-type(73),
.color-text-flow-hover:hover span:nth-of-type(73) {
  -webkit-animation-delay: -5.4s;
  animation-delay: -5.4s;
}
.color-text-flow span:nth-of-type(74),
.color-text-flow-hover:hover span:nth-of-type(74) {
  -webkit-animation-delay: -5.2s;
  animation-delay: -5.2s;
}
.color-text-flow span:nth-of-type(75),
.color-text-flow-hover:hover span:nth-of-type(75) {
  -webkit-animation-delay: -5s;
  animation-delay: -5s;
}
.color-text-flow span:nth-of-type(76),
.color-text-flow-hover:hover span:nth-of-type(76) {
  -webkit-animation-delay: -4.8s;
  animation-delay: -4.8s;
}
.color-text-flow span:nth-of-type(77),
.color-text-flow-hover:hover span:nth-of-type(77) {
  -webkit-animation-delay: -4.6s;
  animation-delay: -4.6s;
}
.color-text-flow span:nth-of-type(78),
.color-text-flow-hover:hover span:nth-of-type(78) {
  -webkit-animation-delay: -4.4s;
  animation-delay: -4.4s;
}
.color-text-flow span:nth-of-type(79),
.color-text-flow-hover:hover span:nth-of-type(79) {
  -webkit-animation-delay: -4.2s;
  animation-delay: -4.2s;
}
.color-text-flow span:nth-of-type(80),
.color-text-flow-hover:hover span:nth-of-type(80) {
  -webkit-animation-delay: -4s;
  animation-delay: -4s;
}
.color-text-flow span:nth-of-type(81),
.color-text-flow-hover:hover span:nth-of-type(81) {
  -webkit-animation-delay: -3.8s;
  animation-delay: -3.8s;
}
.color-text-flow span:nth-of-type(82),
.color-text-flow-hover:hover span:nth-of-type(82) {
  -webkit-animation-delay: -3.6s;
  animation-delay: -3.6s;
}
.color-text-flow span:nth-of-type(83),
.color-text-flow-hover:hover span:nth-of-type(83) {
  -webkit-animation-delay: -3.4s;
  animation-delay: -3.4s;
}
.color-text-flow span:nth-of-type(84),
.color-text-flow-hover:hover span:nth-of-type(84) {
  -webkit-animation-delay: -3.2s;
  animation-delay: -3.2s;
}
.color-text-flow span:nth-of-type(85),
.color-text-flow-hover:hover span:nth-of-type(85) {
  -webkit-animation-delay: -3s;
  animation-delay: -3s;
}
.color-text-flow span:nth-of-type(86),
.color-text-flow-hover:hover span:nth-of-type(86) {
  -webkit-animation-delay: -2.8s;
  animation-delay: -2.8s;
}
.color-text-flow span:nth-of-type(87),
.color-text-flow-hover:hover span:nth-of-type(87) {
  -webkit-animation-delay: -2.6s;
  animation-delay: -2.6s;
}
.color-text-flow span:nth-of-type(88),
.color-text-flow-hover:hover span:nth-of-type(88) {
  -webkit-animation-delay: -2.4s;
  animation-delay: -2.4s;
}
.color-text-flow span:nth-of-type(89),
.color-text-flow-hover:hover span:nth-of-type(89) {
  -webkit-animation-delay: -2.2s;
  animation-delay: -2.2s;
}
.color-text-flow span:nth-of-type(90),
.color-text-flow-hover:hover span:nth-of-type(90) {
  -webkit-animation-delay: -2s;
  animation-delay: -2s;
}
.color-text-flow span:nth-of-type(91),
.color-text-flow-hover:hover span:nth-of-type(91) {
  -webkit-animation-delay: -1.8s;
  animation-delay: -1.8s;
}
.color-text-flow span:nth-of-type(92),
.color-text-flow-hover:hover span:nth-of-type(92) {
  -webkit-animation-delay: -1.6s;
  animation-delay: -1.6s;
}
.color-text-flow span:nth-of-type(93),
.color-text-flow-hover:hover span:nth-of-type(93) {
  -webkit-animation-delay: -1.4s;
  animation-delay: -1.4s;
}
.color-text-flow span:nth-of-type(94),
.color-text-flow-hover:hover span:nth-of-type(94) {
  -webkit-animation-delay: -1.2s;
  animation-delay: -1.2s;
}
.color-text-flow span:nth-of-type(95),
.color-text-flow-hover:hover span:nth-of-type(95) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.color-text-flow span:nth-of-type(96),
.color-text-flow-hover:hover span:nth-of-type(96) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}
.color-text-flow span:nth-of-type(97),
.color-text-flow-hover:hover span:nth-of-type(97) {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}
.color-text-flow span:nth-of-type(98),
.color-text-flow-hover:hover span:nth-of-type(98) {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.color-text-flow span:nth-of-type(99),
.color-text-flow-hover:hover span:nth-of-type(99) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.color-text-flow span:nth-of-type(100),
.color-text-flow-hover:hover span:nth-of-type(100) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}

.not-found-container {
  /*font-family: 'Source Sans Pro', 'Spoqa Han Sans', Helvetica, Arial, sans-serif;*/
  font-weight: 200;
  font-size: 2em;
  text-transform: uppercase;
  line-height: 1;
  text-rendering: optimizeLegibility;
  text-align: center;

  position: absolute;
  top: 350px;
  left: 50%;
  width: 100%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  cursor: default;
}

.not-found-container > div#not-found > p {
  margin: -12px 0 0 0;
}

#title404 {
  font-size: 3.3em;
  font-weight: 700;
}

#poem-flower {
  font-family: 'Iropke Batang','Source Sans Pro', 'Spoqa Han Sans', Helvetica, Arial, sans-serif;

  margin: 0;

  font-size: 0.5em;
  font-style: italic;
  line-height: 0.3;
}
</style>
