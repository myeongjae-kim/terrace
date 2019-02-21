// vue.config.js
const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    // __INSERTION_POSITION__ // DONT CHANGE!!
    routes: [
  "/",
  "/blog/",
  "/daily/",
  "/musings/",
  "/places/",
  "/blog-example/",
  "/404/",
  "/blog/2019/02/04/react-in-a-sight-of-whom-used-to-vue/",
  "/blog/2019/02/02/prepare-commit-msg-hook-issue-number/",
  "/blog/2018/10/05/웹-spa에서-disqus-적용하기/",
  "/blog/2018/09/23/single-page-app의-search-engine-optimizaion과-vuejs/",
  "/blog/2018/09/18/블로깅-시스템을-만들었습니다/",
  "/blog/2017/09/17/rob-pike의-프로그래밍-규칙-5가지/",
  "/blog/2017/07/20/vimlinux-13-vim-go와-deoplete-go-go언어를-위한-플러그인/",
  "/blog/2017/07/20/vimlinux-12-고요goyo-방해금지-모드-플러그인/",
  "/blog/2017/07/19/vimlinux-11-nerd-commenter-주석-단축키-플러그인/",
  "/blog/2017/07/19/vimlinux-10-deoplete과-clang_complete-자동-완성-플러그인/",
  "/blog/2017/07/18/vimlinux-9-synatstic-문법-체크-플러그인/",
  "/blog/2017/07/15/vimlinux-8-ultisnip과-vim-snippets/",
  "/blog/2017/07/15/vimlinux-7-delimitmate-괄호-자동-완성-플러그인/",
  "/blog/2017/07/14/vimlinux-6-vim-multiple-cursor와-vim-smooth-scroll/",
  "/blog/2017/07/14/vimlinux-5-the-nerd-tree-설치하기/",
  "/blog/2016/12/03/끝까지-가자/",
  "/blog/2016/11/02/macos-맥-터미널로-우분투-사용하기/",
  "/blog/2016/10/06/vimlinux-4-플러그인-매니저를-설치하고-vim-airline-설치하기/",
  "/blog/2016/10/02/vimlinux-3-vimrc-기본설정/",
  "/blog/2016/10/01/vimlinux-2-neovim-설치하고-24bit-컬러-적용하기/",
  "/blog/2016/10/01/vimlinux-1-vim을-왜-쓰냐고/",
  "/blog/2016/06/27/책-소프트웨어-장인에서-언급한-책-10권/",
  "/blog/2016/03/01/소프트웨어-장인정신-서평/",
  "/blog/2016/03/01/발췌-상아탑-아키텍트-대처하기/",
  "/blog/2016/02/26/소프트웨어-누가-이렇-개떡-같이-만든거야/",
  "/blog/2016/02/10/마초를-만드는-환경/",
  "/blog/2016/02/10/남자아이가-마초가-되어가는-과정/",
  "/blog/2016/01/19/가장-오래된-작품들이-가장-덜-낡았다/",
  "/blog/2016/01/14/진정한-교양/",
  "/blog/2016/01/14/독자는-의무가-아닌-애정의-행로를-따라가야-한다/",
  "/blog/2015/10/17/the-c-programming-language/",
  "/daily/2019/02/21/who-am-i/",
  "/daily/2019/02/20/valuate-members/",
  "/daily/2019/02/18/thanks/",
  "/daily/2019/02/16/powerful/",
  "/daily/2019/02/15/joy/",
  "/daily/2019/02/14/book/",
  "/daily/2019/02/13/blogs/",
  "/daily/2019/02/11/feminism/",
  "/daily/2019/02/10/meaning-of-life/",
  "/daily/2019/02/08/dream/",
  "/daily/2019/02/07/abandoned-service/",
  "/daily/2019/02/06/untitled/",
  "/daily/2019/02/05/dayuki/",
  "/daily/2019/02/04/react/",
  "/daily/2019/02/03/untitled/",
  "/daily/2019/02/02/first-journal/"
]
    // __INSERTION_POSITION_END__ // DONT CHANGE!!
    ,
    renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
      renderAfterElementExists: '#app'
    }),
  }),
];

module.exports = {
  lintOnSave: false,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(...productionPlugins);
    }
  },
};