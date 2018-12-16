<template>
  <div id="musings">
    <div id="musings-main">
      <h1 class="component-title">Quotes</h1>
      <!-- Show titles of Musings contents -->
      <div id="musings-list" v-for="i in musings" :key="i.key">
        <div class="musing-element" :style="i.css">
          <p class="musing-sentence" v-for="s in i.sentences" :key="s">{{ s }}</p>
          <p class="musing-author">{{ i.author }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Musings",
  metaInfo: {
    title: "Musings",
    meta: [
      { charset: "utf-8" },
      {
        property: "og:title",
        content: "Musings",
        template: chunk => `${chunk} :: Myeongjae Kim`,
        vmid: "og:title"
      },
      {
        property: "og:description",
        content: "which inspire me",
        template: chunk => `${chunk}`,
        vmid: "og:description"
      }
    ]
  },
  beforeDestroy: function() {
    var nav = document.querySelector("nav");
    nav.setAttribute(
      "class",
      nav.getAttribute("class").replace(/ musing-font/gi, "")
    );
  },
  data() {
    return {
      musings: [
        {
          key: 0,
          sentences: ["“많이 말하지도 말고,", "갑자기 성내지도 말 것이다.”"],
          author: "- 정약용, <목민심서>, 창비, 2005",
          css: ""
        },
        {
          key: 1,
          sentences: [
            "“The one thing you can’t take away from me is the way I choose to respond to what you do to me. The last of one’s freedoms is to choose one’s attitude in any given circumstance.”"
          ],
          author: "- Viktor E. Frankl, <Man's Search for Meaning>",
          css: "font-family: 'Bad Script'; font-style:normal;"
        },
        {
          key: 2,
          sentences: [
            "“대화는 철학, 예술, 시, 정치, 사랑, 소문, 날씨라고",
            "하는 7개의 현을 가진 7현금에 비유할 수 있다.”"
          ],
          author: "- 안나 브라우넬 제임슨, <프랭클린 플래너, 2015년 11월 27일>",
          css: ""
        },
        {
          key: 3,
          sentences: [
            "“It seems that perfection is attained not when there is nothing more to add, but when there is nothing more to remove.”"
          ],
          author:
            "- Antoine de Saint Exupéry, <Wind, Sand and Stars>, 1939, Chapter 3",
          css: "font-family: 'Bad Script'; font-style:normal;"
        },
        {
          key: 3,
          sentences: [
            "“과학자라는 인간이 '빨간색으로 이름을 쓰면 죽는다'라는 미신에 휘둘려 이렇게 평정심을 잃은 모습을 보면서 제 자신이 얼마나 비과학적인 삶을 살고 있는가에 대해 생각해보게 됐습니다. 그래서 그 자리에서 일어나 책상에 불을 켜고 앉아서 하얀색 종이에다가 빨간색으로 제 이름을 썼어요. 그날 저는 비로소 '과학자 정재승'으로 다시 태어났습니다.”"
          ],
          author: "- 정재승, <열두 발자국>, 2018, 여섯 번째 발자국, p160",
          css: "line-height: 2.2em;"
        }
      ]
    };
  },
  mounted: function() {
    // Add font to nav
    var nav = document.querySelector("nav");
    var attr = nav.getAttribute("class");
    if (attr == null) attr = "";
    nav.setAttribute("class", attr + " musing-font");

    [].forEach.call(document.querySelectorAll(".text"), function(el) {
      var origin = el.innerHTML;
      var new_html = "";
      for (var i = 0; i < origin.length; i++)
        new_html += "<span>" + origin[i] + "</span>";
      el.innerHTML = new_html;
    });
  }
};
</script>

<style>
.musing-font {
  font-family: "Bad Script", "Source Sans Pro", "Spoqa Han Sans", Helvetica,
    Arial, sans-serif;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div#musings {
  min-height: 300px;
  max-width: 400px;
  margin: auto;
}

.component-title {
  font-family: "Bad Script";
  margin-top: 0;
}

.musing-element {
  font-family: "Iropke Batang", "Spoqa Han Sans", serif;
  padding: 0;
  padding-bottom: 10px;
  font-style: italic;
  font-size: 1.1em;
}

.hidden {
  display: none !important;
}

.musing-author {
  font-size: 0.8em;
}
</style>
