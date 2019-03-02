<template>
  <div id="daily">
    <div id="daily-main" v-if="year === undefined">
      <div class="expand-close-buttons">
        <a v-on:click="expandAll()">
          <button>모두 펼치기</button>
        </a>
        <a v-on:click="shrinkAll()">
          <button>모두 접기</button>
        </a>
      </div>
      <div id="daily-article-container">
        <div v-for="i in index" :key="i.path">
          <router-link :to="i.path">
            <table class="daily-article-title">
              <tr>
                <td class="journal-relative-id">{{i.relativeId + 1}}.</td>
                <td class="journal-date">[{{i.date.year}}.{{i.date.month}}.{{i.date.day}}]</td>
                <td class="journal-title">{{ i.title }}</td>
              </tr>
            </table>
            <div class="daily-article-contents">
              <div
                :id="i.path"
                v-bind:class="{ 'display-none' : !isExpanded }"
                class="daily-article-contents-text color-default"
              >{{i.path}}</div>
              <div class="leave-comment-button">
                <button v-bind:class="{ 'display-none' : !isExpanded }">댓글 남기기</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else id="contents">
      <div class="expand-close-buttons">
        <router-link to="/daily/">
          <button>전체 보기</button>
        </router-link>
      </div>
      <article>
        <div class="inner-title-container">
          <a :href="currentPath">
            {{currentRelativeId + 1}}. [{{year}}.{{month}}.{{day}}]
            <span
              id="inner-title"
            >{{ title }}</span>
          </a>
        </div>
        <div id="padding-between-title-and-article"></div>
        <div class="daily-article-contents">
          <div v-html="articleHtmlSource" class="daily-article-contents-text color-black"></div>
        </div>
      </article>

      <div id="list-below-article">
        <div
          class="list-below-article-element"
          v-for="i in index"
          :key="i.path"
          v-bind:class="{ 'current-article' : i.path === currentPath }"
        >
          <router-link :to="i.path">
            <table class="daily-article-title">
              <tr>
                <td class="journal-relative-id">{{i.relativeId + 1}}.</td>
                <td class="journal-date">[{{i.date.year}}.{{i.date.month}}.{{i.date.day}}]</td>
                <td class="journal-title">{{ i.title }}</td>
              </tr>
            </table>
          </router-link>
        </div>
      </div>

      <div id="disqus_wrapper" v-show="title != null && title != undefined">
        <div id="disqus_thread"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "daily",
  metaInfo() {
    if (this.title === undefined) {
      return {
        title: "Daily",
        meta: [
          { charset: "utf-8" },
          {
            property: "og:title",
            content: "Daily",
            template: chunk => `${chunk} :: Myeongjae Kim`,
            vmid: "og:title"
          },
          {
            property: "og:description",
            content: "comments to catch thoughts of a day",
            template: chunk => `${chunk}`,
            vmid: "og:description"
          }
        ]
      };
    } else {
      return {
        title: this.titleForMeta,
        meta: [
          { charset: "utf-8" },
          {
            property: "og:title",
            content: this.title,
            template: chunk => `${chunk} :: Myeongjae Kim`,
            vmid: "og:title"
          },
          {
            property: "og:description",
            content: "Catch thoughts of daily life",
            template: chunk => `${chunk}`,
            vmid: "og:description"
          }
        ]
      };
    }
  },

  data() {
    return {
      // __INSERTION_POSITION__ // DONT CHANGE!!
      index: [
  {
    "relativeId": 23,
    "title": "퍼블리2",
    "path": "/daily/2019/03/01/publy2/",
    "date": {
      "year": "2019",
      "month": "03",
      "monthEng": "March",
      "day": "01",
      "dayEng": "1st"
    }
  },
  {
    "relativeId": 22,
    "title": "책 읽기",
    "path": "/daily/2019/02/28/book-and-primitive-brain/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "28",
      "dayEng": "28th"
    }
  },
  {
    "relativeId": 21,
    "title": "퍼블리",
    "path": "/daily/2019/02/27/publy/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "27",
      "dayEng": "27th"
    }
  },
  {
    "relativeId": 20,
    "title": "위빠사나",
    "path": "/daily/2019/02/26/vipassana/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "26",
      "dayEng": "26th"
    }
  },
  {
    "relativeId": 19,
    "title": "다육이2",
    "path": "/daily/2019/02/25/dayuki2/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "25",
      "dayEng": "25th"
    }
  },
  {
    "relativeId": 18,
    "title": "갑",
    "path": "/daily/2019/02/24/gab/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "24",
      "dayEng": "24th"
    }
  },
  {
    "relativeId": 17,
    "title": "비극",
    "path": "/daily/2019/02/23/tragedy/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "23",
      "dayEng": "23rd"
    }
  },
  {
    "relativeId": 16,
    "title": "간담회 후",
    "path": "/daily/2019/02/22/after-the-conference/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "22",
      "dayEng": "22nd"
    }
  },
  {
    "relativeId": 15,
    "title": "누구인가?",
    "path": "/daily/2019/02/21/who-am-i/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "21",
      "dayEng": "21st"
    }
  },
  {
    "relativeId": 14,
    "title": "팀원을 평가하는 세 가지 기준",
    "path": "/daily/2019/02/20/valuate-members/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "20",
      "dayEng": "20th"
    }
  },
  {
    "relativeId": 13,
    "title": "감사의 글",
    "path": "/daily/2019/02/18/thanks/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "18",
      "dayEng": "18th"
    }
  },
  {
    "relativeId": 12,
    "title": "파워풀",
    "path": "/daily/2019/02/16/powerful/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "16",
      "dayEng": "16th"
    }
  },
  {
    "relativeId": 11,
    "title": "",
    "path": "/daily/2019/02/15/joy/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "15",
      "dayEng": "15th"
    }
  },
  {
    "relativeId": 10,
    "title": "단조증가",
    "path": "/daily/2019/02/14/book/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "14",
      "dayEng": "14th"
    }
  },
  {
    "relativeId": 9,
    "title": "퍼스날 데이타베이스",
    "path": "/daily/2019/02/13/blogs/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "13",
      "dayEng": "13rd"
    }
  },
  {
    "relativeId": 8,
    "title": "성찰하는 남자들",
    "path": "/daily/2019/02/11/feminism/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "11",
      "dayEng": "11st"
    }
  },
  {
    "relativeId": 7,
    "title": "삶의 의미",
    "path": "/daily/2019/02/10/meaning-of-life/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "10",
      "dayEng": "10th"
    }
  },
  {
    "relativeId": 6,
    "title": "꿈",
    "path": "/daily/2019/02/08/dream/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "08",
      "dayEng": "8th"
    }
  },
  {
    "relativeId": 5,
    "title": "버림받는다는 것",
    "path": "/daily/2019/02/07/abandoned-service/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "07",
      "dayEng": "7th"
    }
  },
  {
    "relativeId": 4,
    "title": "",
    "path": "/daily/2019/02/06/untitled/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "06",
      "dayEng": "6th"
    }
  },
  {
    "relativeId": 3,
    "title": "다육이",
    "path": "/daily/2019/02/05/dayuki/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "05",
      "dayEng": "5th"
    }
  },
  {
    "relativeId": 2,
    "title": "React",
    "path": "/daily/2019/02/04/react/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "04",
      "dayEng": "4th"
    }
  },
  {
    "relativeId": 1,
    "title": "",
    "path": "/daily/2019/02/03/untitled/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "03",
      "dayEng": "3rd"
    }
  },
  {
    "relativeId": 0,
    "title": "첫 번째 일기",
    "path": "/daily/2019/02/02/first-journal/",
    "date": {
      "year": "2019",
      "month": "02",
      "monthEng": "February",
      "day": "02",
      "dayEng": "2nd"
    }
  }
],
      // __INSERTION_POSITION_END__ // DONT CHANGE!!
      year: this.$route.params.year,
      month: this.$route.params.month,
      day: this.$route.params.day,
      title: this.$route.params.title,
      titleForMeta: "",
      articleHtmlSource: "",
      domain: "https://myeongjae.kim",
      currentPath: "",
      currentPermalink: "",
      currentRelativeId: null,
      isExpanded: false
    };
  },
  watch: {
    $route(to) {
      this.year = to.params.year;
      this.month = to.params.month;
      this.day = to.params.day;
      this.title = to.params.title;
      this.getContents();
    }
  },
  mounted: function() {
    this.getContents();
    this.loadAllContents();
  },
  updated: function() {
    if (this.year !== undefined) {
      this.shrinkAll();
      var contents = document.querySelector("#contents");
      if (contents == null) {
        this.toTheTop();
        return;
      }

      // Find all h1 tags, and choose first h1. It is a real title of this doc.
      var titles = contents.querySelectorAll("h1");
      if (titles.length <= 0) {
        return;
      } else {
        // Title exists
        var title = contents.querySelector("#inner-title");
        title.innerHTML = titles[0].innerHTML;
        titles[0].style.display = "none";

        // It is for og:title
        this.titleForMeta = title.innerHTML;
      }
    }

    if (!(this.title == null || this.title == undefined)) {
      this.initDisqus(
        "myeongjae",
        this.currentPath, // uri path as an identifier
        this.title,
        this.currentPermalink
      );
    }

    // add class 'router-link-exact-active' to the blog nav
    var nav_blog = document.querySelector("nav");

    var isClassAdded = false;
    [].forEach.call(nav_blog.querySelectorAll("a"), function(el) {
      // return immediately when target is found and updated.
      if (isClassAdded) return;

      // Add ' router-link-exact-active' to the class attribute.
      if (el.getAttribute("href") == "/daily/") {
        el.setAttribute(
          "class",
          el.getAttribute("class") + " router-link-exact-active"
        );
        isClassAdded = true;
      }
    });
  },
  methods: {
    toTheTop: function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
    loadAllContents: async function() {
      //TODO: This function load lots of data. Let it called rarely.
      if (this.year !== undefined) {
        return;
      }

      for (var i in this.index) {
        var path = this.index[i].path;
        var htmlDocUri = path.replace("daily", "daily_contents") + ".html";
        htmlDocUri = htmlDocUri.replace("/.", ".");

        await fetch(htmlDocUri)
          .then(response => response.text())
          .then(responseText => {
            var contents = document.getElementById(this.index[i].path);
            contents.innerHTML = responseText;
            // hide big title
            contents.querySelector("h1").style.display = "none";
          });
      }
    },
    expandAll: function() {
      this.isExpanded = true;
      this.loadAllContents();
    },
    shrinkAll: function() {
      this.isExpanded = false;
    },
    getContents: function() {
      if (this.year === undefined) {
        return;
      }

      this.toTheTop();

      var htmlDocUri =
        "/daily_contents/" +
        this.year +
        "/" +
        this.month +
        "/" +
        this.day +
        "/" +
        this.title +
        ".html";

      this.currentPath =
        "/daily/" +
        this.year +
        "/" +
        this.month +
        "/" +
        this.day +
        "/" +
        this.title +
        "/";

      this.currentPermalink = this.domain + this.currentPath;

      // TODO: Remove this ugly for loop
      for (var i in this.index) {
        if (this.index[i].path === this.currentPath) {
          this.currentRelativeId = this.index[i].relativeId;
          break;
        }
      }

      fetch(htmlDocUri)
        .then(response => response.text())
        .then(responseText => (this.articleHtmlSource = responseText));
    },
    initDisqus: function(shortname, identifier, title, url) {
      //config
      if (typeof DISQUS === "undefined") {
        (async () => {
          var vars_text =
            'var disqus_shortname  = "' +
            shortname +
            '";\n' +
            'var disqus_title      = "' +
            title +
            '";\n' +
            'var disqus_identifier = "' +
            identifier +
            '";\n' +
            'var disqus_url        = "' +
            url +
            '";\n';

          var vars_obj = document.createElement("script");
          vars_obj.type = "text/javascript";
          vars_obj.async = true;
          vars_obj.text = vars_text;
          (
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]
          ).appendChild(vars_obj);

          var dsq = document.createElement("script");
          dsq.type = "text/javascript";
          dsq.async = true;
          dsq.src = "//" + shortname + ".disqus.com/embed.js";
          (
            document.getElementsByTagName("head")[0] ||
            document.getElementsByTagName("body")[0]
          ).appendChild(dsq);
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
    }
  }
};
</script>

<style scoped>
.journal-relative-id {
  width: 25px;
  text-align: right;
}

.journal-date {
  width: 100px;
}

.journal-title {
  width: 200px;
  text-align: left;
}

.daily-article-title tr {
  border: 0;
}
.daily-article-title tr td {
  border: 0;
  padding: 0;
}

.daily-article-contents-text {
  text-indent: 0.5em;

  display: block;
  background: #fafafa;
  padding: 5px 10px 5px 10px;
  margin: 20px 0 20px 0;
  position: relative;

  font-family: "Iropke Batang", "Source Sans Pro", "Spoqa Han Sans", Helvetica,
    Arial, sans-serif;
  font-size: 0.9em;
  line-height: 1.6em;

  border: 1px #e0e0e0 solid !important;
  border-radius: 5px;
}

.daily-article-contents {
  text-align: left;
  width: 500px;
  max-width: 100%;
  margin: auto;
}

a {
  cursor: pointer;
}

.expand-close-buttons {
  padding: 10px 0 30px 0;
}

.expand-close-buttons button {
  padding: 0 2px 0 2px;
  margin: 0 5px 0 5px;
  width: 100px;
}

.daily-article-title,
.inner-title-container,
button {
  font-family: "Iropke Batang", "Source Sans Pro", "Spoqa Han Sans", Helvetica,
    Arial, sans-serif;
}

.inner-title-container {
  margin-top: 0;
  margin-bottom: 20px;
}

button {
  box-shadow: 0px 0px 0px;
  -moz-box-shadow: 0px 0px 0px;
  -webkit-box-shadow: 0px 0px 0px;
  background: #fafafa;
}

.color-default {
  color: #2c3e50;
}

.color-black {
  color: #000;
}

.current-article td {
  cursor: default;
  color: #2c3e50 !important;
}

.display-none {
  display: none;
}
.leave-comment-button {
  text-align: center;
}
.leave-comment-button button {
  margin-bottom: 30px;
}

#disqus_thread {
  width: 500px;
  max-width: 100%;
  margin: auto;
  margin-bottom: 20px;
}

#list-below-article {
  margin-bottom: 20px;
}

#daily-article-container {
  width: 530px;
  max-width: 100%;
  margin: auto;
}
</style>
