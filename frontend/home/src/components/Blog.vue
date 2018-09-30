<template>
  <div id="blog">
    <div id="blog-main" v-if="year === undefined">
      <h1 class="component-title">Articles</h1>
      <!-- Show titles of blog contents -->
      <div class="blog-article-list" v-for="i in index" :key="i.path">
        <p class="article-info">
        <router-link :to="i.path" class="article-title">{{i.title}}</router-link>
        <!-- <br>{{ i.date.monthEng }} {{ i.date.dayEng }}, {{ i.date.year }}</p> -->
        <br><span class="article-date">{{ i.date.year }} / {{ i.date.month }} / {{ i.date.day }}</span></p>
      </div>
    </div>
    <div id="blog-contents" v-else>
      <article>
        <div class="article-inner-title" v-show="isTitleShown">
          <h1><a :href="address">{{ title }}</a></h1>
          <p class="meta">{{ year }} / {{ month }} / {{ day }}</p>
        </div>
        <div id="padding-between-title-and-article"></div>
        <div id="article-content" v-html="article"></div>
        <div id="share-buttons">
          <button class="copy-btn" :data-clipboard-text="address">{{copyBtnMsg}}</button>
          &nbsp;
          <router-link to="/blog/"><button>Article List</button></router-link>
        </div>
      </article>
      <hr>
      <div id="adjacent-articles">
        <div id="next-article" v-if="currentArticleIdx > 0">
          <h4>Next Article</h4>
          <p><router-link :to="index[currentArticleIdx-1].path">{{index[currentArticleIdx-1].title}}</router-link></p>
        </div>
        <div id="prev-article" v-if="currentArticleIdx < index.length-1">
          <h4>Previous Article</h4>
          <p><router-link :to="index[currentArticleIdx+1].path">{{index[currentArticleIdx+1].title}}</router-link></p>
        </div>
      </div>
      <div id="disqus_thread"></div>
    </div>
    <a class="back_to_top">&uarr;</a>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

import HighlightJS from 'highlight.js/lib/highlight.js'
//var HighlightJS = require("highlight.js/lib/highlight.js");

// Add languages manually to decrease size of my website
HighlightJS.registerLanguage('vim', require('highlight.js/lib/languages/vim'));
HighlightJS.registerLanguage('bash', require('highlight.js/lib/languages/bash'));

// eslint-disable-next-line
import _ from 'highlight.js/styles/xcode.css'

export default {
  name: 'Blog',
  metaInfo () {
    if(this.title === undefined) {
      return {
        title: 'Blog',
        meta: [
          { charset: 'utf-8' },
          {
            'property': 'og:title',
            'content': 'Blog',
            'template': chunk => `${chunk} :: Myeongjae Kim`,
            'vmid': 'og:title'
          },
          {
            'property': 'og:description',
            'content': 'Article List',
            'template': chunk => `${chunk}`,
            'vmid': 'og:description'
          },
        ]
      }
    } else {
      return {
        title: this.title,
        meta: [
          { charset: 'utf-8' },
          {
            'property': 'og:title',
            'content': this.title,
            'template': chunk => `${chunk} :: Myeongjae Kim`,
            'vmid': 'og:title'
          },
          {
            'property': 'og:description',
            'content': 'Thank you for reading my article 🙈',
            'template': chunk => `${chunk}`,
            'vmid': 'og:description'
          }
        ]
      }
    }
  },

  mounted: function() {
    this.initCopyButton();
    this.getPage();
    this.initBackToTopButton();
    
  },
  beforeDestroy: function() {
    // Destroy the ClipboardJS object
    this.ClipboardJS.destroy();
  },

  updated: function() {
    // Change file name to document's title
    // When the page is an artice page, get blogContents
    var blogContents = document.querySelector('#blog-contents');
    if(blogContents == null){
      this.isTitleShown = true;
      this.toTheTop();
      return;
    }

    // Now, below scripts are for displaying an article,
    // not the blog main page which has lists of name of articles.

    // Find all h1 tags, and choose second h1. It is real title of this doc.
    var titles = blogContents.querySelectorAll('h1');
    if(titles.length <= 1) {
      this.isTitleShown = true;
      return;
    }

    this.title = titles[1].innerHTML;
    titles[1].style.display = "none";
    this.isTitleShown = true;

    // Enable disqus

    /*
    console.log('myeongjae');
    console.log(this.address.replace(this.domain, "")); // uri as an identifier
    console.log(this.title);
    console.log(this.address);
    */

    this.enableDisqus(
      'myeongjae',
      this.address.replace(this.domain, ""), // uri as an identifier
      this.title,
      this.address
    );

    // add class 'router-link-exact-active' to the blog nav
    var nav_blog = document.querySelector('nav');

    var isClassAdded = false;
    [].forEach.call(nav_blog.querySelectorAll('a'), function(el) {
      // return immediately when target is found and updated.
      if(isClassAdded) return;

      // Add ' router-link-exact-active' to the class attribute.
      if(el.getAttribute('href') == "#/blog") {
        el.setAttribute(
          'class',
          el.getAttribute('class') + ' router-link-exact-active'
        );
        isClassAdded = true;
      }
    });

    // Find all code block and apply syntax highlighting
    [].forEach.call(document.querySelectorAll('code'), function(el) {
      HighlightJS.highlightBlock(el);
    });
  },
  data() {
    return {
      year: this.$route.params.year,
      month: this.$route.params.month,
      day: this.$route.params.day,
      title: this.$route.params.title,
      article: "",   // will contain contents' html. 
      address : "",  // will have a permalink of the article
      domain : "https://blog.myeongjae.kim",
      copyBtnMsg :   "Copy Link",
      copiedBtnMsg : "Copied",
      ClipboardJS : null,
      currentArticleIdx : null,

      // INJECT_POSITION DO NOT MODIFY THIS LINE!
      // The first json array after this line is
      // the position of injecting index json. index MUST have an array.
      index :  [{"relativeId":0,"title":"테스트 문서입니다.","path":"/blog/2018/09/29/test/","date":{"year":"2018","month":"09","monthEng":"September","day":"29","dayEng":"29th"}},{"relativeId":1,"title":"[웹] Single Page App의 Search Engine Optimization과 VueJS","path":"/blog/2018/09/23/single-page-app의-search-engine-optimizaion과-vuejs/","date":{"year":"2018","month":"09","monthEng":"September","day":"23","dayEng":"23rd"}},{"relativeId":2,"title":"[웹] 블로깅 시스템을 만들었습니다","path":"/blog/2018/09/18/블로깅-시스템을-만들었습니다/","date":{"year":"2018","month":"09","monthEng":"September","day":"18","dayEng":"18th"}},{"relativeId":3,"title":"[기술] Rob Pike의 프로그래밍 규칙 5가지","path":"/blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/","date":{"year":"2017","month":"09","monthEng":"September","day":"17","dayEng":"17th"}},{"relativeId":4,"title":"[vim/Linux] 13. vim-go와 deoplete-go, Go언어를 위한 플러그인","path":"/blog/2017/07/20/vimlinux-13-vim-go와-deoplete-go-go언어를-위한-플러그인/","date":{"year":"2017","month":"07","monthEng":"July","day":"20","dayEng":"20th"}},{"relativeId":5,"title":"[vim/Linux] 12. 고요(Goyo), 방해금지 모드 플러그인","path":"/blog/2017/07/20/vimlinux-12-고요goyo-방해금지-모드-플러그인/","date":{"year":"2017","month":"07","monthEng":"July","day":"20","dayEng":"20th"}},{"relativeId":6,"title":"[vim/Linux] 11. NERD Commenter, 주석 단축키 플러그인","path":"/blog/2017/07/19/vimlinux-11-nerd-commenter-주석-단축키-플러그인/","date":{"year":"2017","month":"07","monthEng":"July","day":"19","dayEng":"19th"}},{"relativeId":7,"title":"[vim/Linux] 10. deoplete과 clang_complete, 자동 완성 플러그인","path":"/blog/2017/07/19/vimlinux-10-deoplete과-clang_complete-자동-완성-플러그인/","date":{"year":"2017","month":"07","monthEng":"July","day":"19","dayEng":"19th"}},{"relativeId":8,"title":"[vim/Linux] 9. Synatstic, 문법 체크 플러그인","path":"/blog/2017/07/18/vimlinux-9-synatstic-문법-체크-플러그인/","date":{"year":"2017","month":"07","monthEng":"July","day":"18","dayEng":"18th"}},{"relativeId":9,"title":"[vim/Linux] 8. UltiSnip과 vim-snippets","path":"/blog/2017/07/15/vimlinux-8-ultisnip과-vim-snippets/","date":{"year":"2017","month":"07","monthEng":"July","day":"15","dayEng":"15th"}},{"relativeId":10,"title":"[vim/Linux] 7. delimitMate, 괄호 자동 완성 플러그인","path":"/blog/2017/07/15/vimlinux-7-delimitmate-괄호-자동-완성-플러그인/","date":{"year":"2017","month":"07","monthEng":"July","day":"15","dayEng":"15th"}},{"relativeId":11,"title":"[vim/Linux] 6. vim-multiple-cursor와 vim-smooth-scroll","path":"/blog/2017/07/14/vimlinux-6-vim-multiple-cursor와-vim-smooth-scroll/","date":{"year":"2017","month":"07","monthEng":"July","day":"14","dayEng":"14th"}},{"relativeId":12,"title":"[vim/Linux] 5. The NERD Tree 설치하기","path":"/blog/2017/07/14/vimlinux-5-the-nerd-tree-설치하기/","date":{"year":"2017","month":"07","monthEng":"July","day":"14","dayEng":"14th"}},{"relativeId":13,"title":"끝까지 가자","path":"/blog/2016/12/03/끝까지-가자/","date":{"year":"2016","month":"12","monthEng":"December","day":"03","dayEng":"3rd"}},{"relativeId":14,"title":"[macOS] 맥 터미널로 우분투 사용하기","path":"/blog/2016/11/02/macos-맥-터미널로-우분투-사용하기/","date":{"year":"2016","month":"11","monthEng":"November","day":"02","dayEng":"2nd"}},{"relativeId":15,"title":"[vim/Linux] 4. 플러그인 매니저를 설치하고 vim-airline 설치하기","path":"/blog/2016/10/06/vimlinux-4-플러그인-매니저를-설치하고-vim-airline-설치하기/","date":{"year":"2016","month":"10","monthEng":"October","day":"06","dayEng":"6th"}},{"relativeId":16,"title":"[vim/Linux] 3. vimrc 기본설정","path":"/blog/2016/10/02/vimlinux-3-vimrc-기본설정/","date":{"year":"2016","month":"10","monthEng":"October","day":"02","dayEng":"2nd"}},{"relativeId":17,"title":"[vim/Linux] 2. Neovim 설치하고 24bit 컬러 적용하기","path":"/blog/2016/10/01/vimlinux-2-neovim-설치하고-24bit-컬러-적용하기/","date":{"year":"2016","month":"10","monthEng":"October","day":"01","dayEng":"1st"}},{"relativeId":18,"title":"[vim/Linux] 1. vim을 왜 쓰냐고?","path":"/blog/2016/10/01/vimlinux-1-vim을-왜-쓰냐고/","date":{"year":"2016","month":"10","monthEng":"October","day":"01","dayEng":"1st"}},{"relativeId":19,"title":"[책] ‘소프트웨어 장인’에서 언급한 책 10권","path":"/blog/2016/06/27/책-소프트웨어-장인에서-언급한-책-10권/","date":{"year":"2016","month":"06","monthEng":"June","day":"27","dayEng":"27th"}},{"relativeId":20,"title":"[책] 소프트웨어 장인","path":"/blog/2016/03/01/소프트웨어-장인정신-서평/","date":{"year":"2016","month":"03","monthEng":"March","day":"01","dayEng":"1st"}},{"relativeId":21,"title":"[발췌] 상아탑 아키텍트 대처하기","path":"/blog/2016/03/01/발췌-상아탑-아키텍트-대처하기/","date":{"year":"2016","month":"03","monthEng":"March","day":"01","dayEng":"1st"}},{"relativeId":22,"title":"[책] 소프트웨어, 누가 이렇게 개떡같이 만든거야?","path":"/blog/2016/02/26/소프트웨어-누가-이렇-개떡-같이-만든거야/","date":{"year":"2016","month":"02","monthEng":"February","day":"26","dayEng":"26th"}},{"relativeId":23,"title":"[발췌] 마초를 만드는 환경","path":"/blog/2016/02/10/마초를-만드는-환경/","date":{"year":"2016","month":"02","monthEng":"February","day":"10","dayEng":"10th"}},{"relativeId":24,"title":"[발췌] 남자아이가 마초가 되어가는 과정","path":"/blog/2016/02/10/남자아이가-마초가-되어가는-과정/","date":{"year":"2016","month":"02","monthEng":"February","day":"10","dayEng":"10th"}},{"relativeId":25,"title":"[발췌] 가장 오래된 작품들이 가장 덜 낡았다","path":"/blog/2016/01/19/가장-오래된-작품들이-가장-덜-낡았다/","date":{"year":"2016","month":"01","monthEng":"January","day":"19","dayEng":"19th"}},{"relativeId":26,"title":"[발췌] 진정한 교양?","path":"/blog/2016/01/14/진정한-교양/","date":{"year":"2016","month":"01","monthEng":"January","day":"14","dayEng":"14th"}},{"relativeId":27,"title":"[발췌] 독자는 의무가 아닌 애정의 행로를 따라가야 한다","path":"/blog/2016/01/14/독자는-의무가-아닌-애정의-행로를-따라가야-한다/","date":{"year":"2016","month":"01","monthEng":"January","day":"14","dayEng":"14th"}},{"relativeId":28,"title":"[책] The C Programming Language","path":"/blog/2015/10/17/the-c-programming-language/","date":{"year":"2015","month":"10","monthEng":"October","day":"17","dayEng":"17th"}}],
      isTitleShown : false,
    }
  },
  watch: {
    '$route' (to) {
      this.year = to.params.year;
      this.month = to.params.month;
      this.day = to.params.day;
      this.title = to.params.title;
      this.getPage();
    }
  },
  methods: {
    initBackToTopButton: function() {
      var vue = this;
      (function() {
        'use strict';

        function trackScroll() {
          var scrolled = window.pageYOffset;
          var coords = document.documentElement.clientHeight / 2;

          if (scrolled > coords) {
            goTopBtn.classList.add('back_to_top-show');
          }
          if (scrolled < coords) {
            goTopBtn.classList.remove('back_to_top-show');
          }
        }

        /*
        function backToTop() {
          if (window.pageYOffset > 0) {
            window.scrollBy(0, -80);
            setTimeout(backToTop, 0);
          }
        }
        */

        var goTopBtn = document.querySelector('.back_to_top');

        window.addEventListener('scroll', trackScroll);
        //goTopBtn.addEventListener('click', backToTop);
        goTopBtn.addEventListener('click', vue.toTheTop);
      })();
    },
    toTheTop : function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    copyUrl : function(event) {
      // copy the url
      var btn;
      if(event.srcElement) {
        btn = event.srcElement;
      } else if (event.target) {
        btn = event.target;
      } else {
        return;
      }

      // change button status to clicked.
      btn.setAttribute('class', ' button-clicked');
      btn.innerHTML = this.copiedBtnMsg;

      // Reset button to initial state
      var vue = this;
      setTimeout(function() {
        btn.setAttribute('class', null);
        btn.innerHTML = vue.copyBtnMsg;
      }, 1100);
    },
    // Below function is from https://solidfoundationwebdev.com/blog/posts/many-disqus-modules-on-a-single-page
    enableDisqus: function(shortname, identifier, title, url) {
      //config
      if(typeof(DISQUS) === 'undefined'){
        (function() {
          var vars_text = "var disqus_shortname  = \"" + shortname  + "\";\n" + 
           "var disqus_title      = \"" + title      + "\";\n" + 
           "var disqus_identifier = \"" + identifier + "\";\n" +
           "var disqus_url        = \"" + url        + "\";\n";

          var vars_obj   = document.createElement("script");
          vars_obj.type  = "text/javascript";
          vars_obj.async = true;
          vars_obj.text  = vars_text;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(vars_obj);

          var dsq = document.createElement('script');
          dsq.type = 'text/javascript';
          dsq.async = true;
          dsq.src = '//' + shortname + '.disqus.com/embed.js';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
      } else {
        // eslint-disable-next-line
        DISQUS.reset({
          reload: true,
          config: function() {
            this.page.identifier = identifier;
            this.page.url = url;
            this.page.title = title;
          }
        });
      }
    },
    getPage: function() {
      if(this.year == undefined) return;

      // Load page after the scroll is on the top
      this.toTheTop();

      // Hide title. The title is shown after it is modified.
      this.isTitleShown = false;


      // If it already has had an article, remove it
      var article = document.querySelector('#article-content');
      if(article != null) {
        article.innerHTML = "";
      }

      var htmlDocUri = 
        '/blog_contents/'
        + this.year + '/'
        + this.month + '/'
        + this.day + '/'
        + this.title + '.html';

      var currentUri = 
        '/blog/'
        + this.year + '/'
        + this.month + '/'
        + this.day + '/'
        + this.title + '/';

      // TODO: Below code's time complexity is O(n).
      // 'this.index' array is sorted by non-increasing order of 'path' element.
      // You can use binary search.
      for(var i = 0; i < this.index.length; i++) {
        if(currentUri == this.index[i].path) {
          this.currentArticleIdx = i;
          break;
        }
      }

      // After loading the document, address variable will be
      // a permalink of this article.
      var uri = htmlDocUri.replace('blog_contents/', '')
                     .replace('.html', '');
      this.address = this.domain + uri;

      var vue = this;
      var xhr = new XMLHttpRequest();
      xhr.open("GET", htmlDocUri, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var str = xhr.responseText.substring(0,4);
          if(str == "<!DO" || str == "<hea") {
            window.location.href = "/404";
          } else {
            vue.article = xhr.responseText;
          }
        }
      };
      xhr.send();
    },
    initCopyButton: function() {
      this.ClipboardJS = new ClipboardJS(".copy-btn"); 

      // Change button state to 'pushed' and reset it
      var vue = this;
      this.ClipboardJS.on('success', function(e) {
        var btn = e.trigger;
        btn.setAttribute(
          'class',
          btn.getAttribute('class') + ' button-clicked'
        );
        btn.innerHTML = vue.copiedBtnMsg;

        // Reset button to initial state
        setTimeout(function() {
          btn.setAttribute(
            'class',
            btn.getAttribute('class').replace(' button-clicked', '')
          );
          btn.innerHTML = vue.copyBtnMsg;
        }, 1100);

        e.clearSelection();
      });

      // Print error msg
      this.ClipboardJS.on('error', function(e) {
        // eslint-disable-next-line
        console.error('Action:', e.action);
        // eslint-disable-next-line
        console.error('Trigger:', e.trigger);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#blog-contents {
  text-align: left;
}

.article-inner-title {
  text-align: center;
}
.article-inner-title > h1{
  margin-bottom: 0;
}

.article-inner-title > h1 > a{
  color: #2c3e50;
}

.article-inner-title > h1 > a:hover{
  color: #3073b3;
}

.blog-title > h1 {
  margin-bottom: 0;
}

.meta {
  margin: 0;
}

div#blog {
  min-height: 300px;
  max-width: 800px;
  margin: auto;
  margin-bottom: 50px;
}

.hidden {
  display:none !important;
}

.article-title {
  font-size: 1.18em;
}

.article-date {
  font-size: 0.9em;
}

article {
  font-size: 1.08em;
}

#padding-between-title-and-article {
  height: 30px;
}

#article-content {
  text-align: left;
  color: #000;
  line-height: 1.6em;
}

#share-buttons {
  text-align: center;
  padding: 20px 0 20px 0;
}

.button-clicked {
  color: #fff;
  background-color: #2c3e50;
}

#adjacent-articles {
  text-align: center;
}

#disqus_thread {
  padding-top: 35px;
}

.blog-article-list {
  max-width: 800px;
  margin:auto;
  padding-bottom:1px;
}




/* begin begin Back to Top button  */

.back_to_top {
  position: fixed;
  bottom: 80px;
  right: 40px;
  z-index: 9999;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #fafafa;
  color: #444;
  cursor: pointer;
  border-radius: 2px;
  display: none;

  opacity: 0.5;
}

.back_to_top:hover {
  background: #f0f0f0;
}

.back_to_top-show {
  display: block;
}
/* end begin Back to Top button  */

</style>
