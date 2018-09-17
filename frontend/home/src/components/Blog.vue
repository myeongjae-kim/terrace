<template>
  <div id="blog">
    <div id="blog-main" v-if="year === undefined">
      <h1 class="component-title">Articles</h1>
      <!-- Show titles of blog contents -->
      <div id="blog-article-list" v-for="i in index" :key="i.path">
        <p><a class="article-title" :href="i.path">{{ i.title }}</a>
        <!-- <br>{{ i.date.monthEng }} {{ i.date.dayEng }}, {{ i.date.year }}</p> -->
        <br><span class="article-date">{{ i.date.year }} / {{ i.date.month }} / {{ i.date.day }}</span></p>
      </div>
    </div>
    <div id="blog-contents" v-else>
      <article>
        <div class="blog-title" v-show="isTitleShown">
          <h1>{{ title }}</h1>
          <p class="meta">{{ year }} / {{ month }} / {{ day }}</p>
        </div>
        <div id="padding-between-title-and-article"></div>
        <div id="article-content" v-html="article"></div>
        <div id="share-buttons">
          <button class="copy-btn" :data-clipboard-text="address">{{copyBtnMsg}}</button>
        </div>
      </article>
      <div id="disqus_thread"></div>
    </div>
  </div>
</template>

<script>
import ClipboardJS from 'clipboard'

export default {
  name: 'Blog',
  mounted: function() {
    this.initCopyButton();
    this.getPage();
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
    titles[1].remove();
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
      copyBtnMsg : "Copy Link to Share",
      copiedBtnMsg : "Copied to Clipboard",
      ClipboardJS : null,

      // INJECT_POSITION DO NOT MODIFY THIS LINE!
      // The first json array after this line is
      // the position of injecting index json. index MUST have an array.
      index :  [{"relativeId":0,"title":"마초를 만드는 환경","path":"/#/blog/2016/02/10/마초를-만드는-환경","date":{"year":"2016","month":"02","monthEng":"February","day":"10","dayEng":"10th"}},{"relativeId":1,"title":"남자아이가 마초가 되어가는 과정","path":"/#/blog/2016/02/10/남자아이가-마초가-되어가는-과정","date":{"year":"2016","month":"02","monthEng":"February","day":"10","dayEng":"10th"}},{"relativeId":2,"title":"가장 오래된 작품들이 가장 덜 낡았다","path":"/#/blog/2016/01/19/가장-오래된-작품들이-가장-덜-낡았다","date":{"year":"2016","month":"01","monthEng":"January","day":"19","dayEng":"19th"}},{"relativeId":3,"title":"진정한 교양?","path":"/#/blog/2016/01/14/진정한-교양","date":{"year":"2016","month":"01","monthEng":"January","day":"14","dayEng":"14th"}},{"relativeId":4,"title":"독자는 의무가 아닌 애정의 행로를 따라가야 한다","path":"/#/blog/2016/01/14/독자는-의무가-아닌-애정의-행로를-따라가야-한다","date":{"year":"2016","month":"01","monthEng":"January","day":"14","dayEng":"14th"}}],
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

      // Hide title. The title is shown after it is modified.
      this.isTitleShown = false;

      var htmlDocUri = 
        '/blog_contents/'
        + this.year + '/'
        + this.month + '/'
        + this.day + '/'
        + this.title + '.html';

      var currentUri = 
        '/#/blog/'
        + this.year + '/'
        + this.month + '/'
        + this.day + '/'
        + this.title;

      // TODO: Below code's time complexity is O(n).
      // 'this.index' array is sorted by non-increasing order of 'path' element.
      // You can use binary search.
      for(var i = 0; i < this.index.length; i++) {
        if(currentUri == this.index[i].path) {
          // console.log(i);
          // TODO: Save relativeId to show previous and next articles.
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
            window.location.href = "/#/404";
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

.blog-title {
  text-align: center;
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
}

.hidden {
  display:none !important;
}

.article-title {
  font-size: 1.1em;
}

.article-date {
  font-size: 0.9em;
}

article {
  font-size : 1.18em;
}

#padding-between-title-and-article {
  height: 30px;
}

#article-content {
  text-indent: 0.5em;
  text-align: justify;
  color: #000;
}

#share-buttons {
  text-align: center;
  padding: 20px 0 35px 0;
}

.button-clicked {
  color: #fff;
  background-color: #2c3e50;
}
</style>
