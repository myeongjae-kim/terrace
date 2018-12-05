<template>
  <div>
  <p>Hello, world!</p>
    <div class="blog-list-element" v-for="i in index" :key="i">
      <a :href="i.uri">{{ i.title }}</a>
      <br>
      {{ i.date }}
    </div>
  </div>
</template>


<script>
export default {
  name: 'blogExample',
  data() {
    return {
      index: 
[{"title":"[Blog/VueJS] 2. 개발환경 세팅","uri":"/blog/2018/10/11/blogvuejs-2-development-environment/","date":"2018/10/11"},{"title":"[Blog/VueJS] 1. 블로깅 시스템 프로젝트 소개","uri":"/blog/2018/10/10/blogvuejs-1-introduction-to-implementing-blog-project/","date":"2018/10/10"},{"title":"[웹] SPA에서 Disqus 적용하기","uri":"/blog/2018/10/05/웹-spa에서-disqus-적용하기/","date":"2018/10/05"},{"title":"[웹] Single Page App의 Search Engine Optimization과 VueJS","uri":"/blog/2018/09/23/single-page-app의-search-engine-optimizaion과-vuejs/","date":"2018/09/23"},{"title":"[웹] 블로깅 시스템을 만들었습니다","uri":"/blog/2018/09/18/블로깅-시스템을-만들었습니다/","date":"2018/09/18"},{"title":"[기술] Rob Pike의 프로그래밍 규칙 5가지","uri":"/blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/","date":"2017/09/17"},{"title":"[vim/Linux] 13. vim-go와 deoplete-go, Go언어를 위한 플러그인","uri":"/blog/2017/07/20/vimlinux-13-vim-go와-deoplete-go-go언어를-위한-플러그인/","date":"2017/07/20"},{"title":"[vim/Linux] 12. 고요(Goyo), 방해금지 모드 플러그인","uri":"/blog/2017/07/20/vimlinux-12-고요goyo-방해금지-모드-플러그인/","date":"2017/07/20"},{"title":"[vim/Linux] 11. NERD Commenter, 주석 단축키 플러그인","uri":"/blog/2017/07/19/vimlinux-11-nerd-commenter-주석-단축키-플러그인/","date":"2017/07/19"},{"title":"[vim/Linux] 10. deoplete과 clang_complete, 자동 완성 플러그인","uri":"/blog/2017/07/19/vimlinux-10-deoplete과-clang_complete-자동-완성-플러그인/","date":"2017/07/19"},{"title":"[vim/Linux] 9. Synatstic, 문법 체크 플러그인","uri":"/blog/2017/07/18/vimlinux-9-synatstic-문법-체크-플러그인/","date":"2017/07/18"},{"title":"[vim/Linux] 8. UltiSnip과 vim-snippets","uri":"/blog/2017/07/15/vimlinux-8-ultisnip과-vim-snippets/","date":"2017/07/15"},{"title":"[vim/Linux] 7. delimitMate, 괄호 자동 완성 플러그인","uri":"/blog/2017/07/15/vimlinux-7-delimitmate-괄호-자동-완성-플러그인/","date":"2017/07/15"},{"title":"[vim/Linux] 6. vim-multiple-cursor와 vim-smooth-scroll","uri":"/blog/2017/07/14/vimlinux-6-vim-multiple-cursor와-vim-smooth-scroll/","date":"2017/07/14"},{"title":"[vim/Linux] 5. The NERD Tree 설치하기","uri":"/blog/2017/07/14/vimlinux-5-the-nerd-tree-설치하기/","date":"2017/07/14"},{"title":"끝까지 가자","uri":"/blog/2016/12/03/끝까지-가자/","date":"2016/12/03"},{"title":"[macOS] 맥 터미널로 우분투 사용하기","uri":"/blog/2016/11/02/macos-맥-터미널로-우분투-사용하기/","date":"2016/11/02"},{"title":"[vim/Linux] 4. 플러그인 매니저를 설치하고 vim-airline 설치하기","uri":"/blog/2016/10/06/vimlinux-4-플러그인-매니저를-설치하고-vim-airline-설치하기/","date":"2016/10/06"},{"title":"[vim/Linux] 3. vimrc 기본설정","uri":"/blog/2016/10/02/vimlinux-3-vimrc-기본설정/","date":"2016/10/02"},{"title":"[vim/Linux] 2. Neovim 설치하고 24bit 컬러 적용하기","uri":"/blog/2016/10/01/vimlinux-2-neovim-설치하고-24bit-컬러-적용하기/","date":"2016/10/01"},{"title":"[vim/Linux] 1. vim을 왜 쓰냐고?","uri":"/blog/2016/10/01/vimlinux-1-vim을-왜-쓰냐고/","date":"2016/10/01"},{"title":"[책] ‘소프트웨어 장인’에서 언급한 책 10권","uri":"/blog/2016/06/27/책-소프트웨어-장인에서-언급한-책-10권/","date":"2016/06/27"},{"title":"[책] 소프트웨어 장인","uri":"/blog/2016/03/01/소프트웨어-장인정신-서평/","date":"2016/03/01"},{"title":"[발췌] 상아탑 아키텍트 대처하기","uri":"/blog/2016/03/01/발췌-상아탑-아키텍트-대처하기/","date":"2016/03/01"},{"title":"[책] 소프트웨어, 누가 이렇게 개떡같이 만든거야?","uri":"/blog/2016/02/26/소프트웨어-누가-이렇-개떡-같이-만든거야/","date":"2016/02/26"},{"title":"[발췌] 마초를 만드는 환경","uri":"/blog/2016/02/10/마초를-만드는-환경/","date":"2016/02/10"},{"title":"[발췌] 남자아이가 마초가 되어가는 과정","uri":"/blog/2016/02/10/남자아이가-마초가-되어가는-과정/","date":"2016/02/10"},{"title":"[발췌] 가장 오래된 작품들이 가장 덜 낡았다","uri":"/blog/2016/01/19/가장-오래된-작품들이-가장-덜-낡았다/","date":"2016/01/19"},{"title":"[발췌] 진정한 교양?","uri":"/blog/2016/01/14/진정한-교양/","date":"2016/01/14"},{"title":"[발췌] 독자는 의무가 아닌 애정의 행로를 따라가야 한다","uri":"/blog/2016/01/14/독자는-의무가-아닌-애정의-행로를-따라가야-한다/","date":"2016/01/14"},{"title":"[책] The C Programming Language","uri":"/blog/2015/10/17/the-c-programming-language/","date":"2015/10/17"}]
    }
  }
}
</script>

<style scoped>
.blog-list-element {
  margin-bottom: 10px;
}
</style>