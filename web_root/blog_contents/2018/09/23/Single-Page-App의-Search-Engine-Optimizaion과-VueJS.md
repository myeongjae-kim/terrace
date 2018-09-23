# [웹] Single Page App의 Search Engine Optimization과 VueJS

한 줄 요약: HTML5의 pushState를 통해 URI의 #을 없앤 뒤 Prerendering을 통해서 자바스크립트가 없어도 웹사이트가 작동하면 됩니다.

### 웹사이트를 만들어 놓았는데 왜 긁어가지를 못하니......

Single Page App(SPA)의 문제점은 검색엔진이 페이지를 긁어가기 어렵다는 것입니다. SPA는 처음에 불러온 HTML을 자바스크립트로 업데이트하면서 동작하는데, 대부분의 검색엔진이 자바스크립트를 실행하지 않습니다. 구글 검색엔진은 자바스크립트를 사용한다고 하는데, 어찌된 일인지 제 웹사이트는 메인페이지밖에 긁어가지 못했습니다.

이 경우 해결책은 두 가지가 있습니다. 첫 번째는 **SSR(Server Side Rendering)**, 두 번째는 **Prerendering** 을 이용하는 것입니다.

SSR은 클라이언트가 자바스크립트 코드를 실행하지 않을 때 서버에서 대신 페이지를 생성해 클라이언트에게 보내는 것입니다. SSR을 사용하는 것이 좋은 경우^1^는 다음과 같습니다.

1. 사용자마다 다른 컨텐츠를 보여주어야 할 때 (e.g.로그인이 필요한 사이트)
2. 클라이언트와 실시간으로 상호작용을 해야 할 때 (e.g. 채팅 서버, 트레이딩 서버 등)
3. 페이지가 많을 때 (= Prerendering이 너무 오래 걸릴 때)

제 웹사이트는 3가지 모두 해당되지 않습니다. 모든 사용자에게 같은 컨텐츠를 보여주고, 클라이언트와 상호작용 하지 않고, 페이지가 100개도 되지 않습니다. 게다가 AWS S3를 서버로 사용하기 때문에 SSR을 적용할 수도 없습니다.

Prerendering은 웹사이트를 빌드할 때 지정한 특정 페이지를 미리 렌더링해서 저장하는 기술입니다. Headless Chrome^2^같은 브라우저로 렌더링합니다. SSR보다 구현하기 쉽고, 빌딩 타임에 렌더링하기 때문에 런타임에 추가로 필요한 연산이 없습니다. 대신에 빌딩 시간이 늘어납니다^3^.

### Prerendering을 적용하기 전에 알아야 할 것

SPA를 구현하는 방법은 두 가지가 있습니다. 첫 번째는 #뒤에 오는 URI를 자바스크립트에서 읽어 라우팅하는 것이고, 두번째는 HTML5 History API를 사용하는 것입니다. 두 번째 방법의 경우 URI에 #을 포함하지 않습니다.

제가 이걸 몰라서 며칠동안 고생했는데, URI에 #이 들어가면 Prerendeing을 할 수 없습니다. 자바스크립트를 실행할 수 있는 검색엔진이라도 #때문에 페이지를 긁어가지 못합니다. Prerendering으로 생성한 페이지들이 모두 메인 페이지의 내용을 담고 있던 이유가 바로 이것이었습니다.

구글은 HTML5 History API를 사용하길 권장합니다^4^.

제가 사용하는 vue-router는 #을 사용하는 것이 기본입니다. router.js안에 한 줄만 추가하면 History API를 사용하게 만들 수 있습니다^5^.

```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

이렇게해서 URI의 #을 없애면 prerendering이 제대로 작동합니다.

### prerender-spa-plugin

이 플러그인은 vuejs의 개발자들이 만든 플러그인입니다. `webpack.config.js`에 설정을 추가하면 빌드하면서 지정한 페이지를 렌더링해 저장합니다. 다음과 같이 플러그인을 설치합니다.

```bash
npm install --save-dev prerender-spa-plugin
```

저는 Vue CLI 3.0을 사용하기 때문에 직접 `webpack.config.js`를 조작하지 않고 `vue.config.js`에 다음과 같이 설정했습니다^6^.

```javascript
/* vue.config.js */
const path = require('path');
const PrerenderSpaPlugin = require('prerender-spa-plugin');

const productionPlugins = [
  new PrerenderSpaPlugin({
    staticDir: path.join(__dirname, 'dist'),
    routes: [
        "/",
        "/blog",
        "/musings",
        "/places",
        "/404",
        "/blog/2018/09/18/블로깅-시스템을-만들었습니다"
    ],
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
```

`routes` 배열에 Prerendering이 필요한 페이지들 지정하면 됩니다. 저는 모든 페이지를 `routes` 배열에 삽입하는 프로그램을 golang으로 짜서 `vue.config.js`를 생성합니다.

빌딩을 하면 `routes`에 지정한 페이지의 디렉토리가 생기고 그 안에 index.html이 만들어집니다.

```bash
~/terrace/frontend/home/dist/blog/2018/09/18/블로깅-시스템을-만들었습니다
❯ ls
index.html
```

이제 자바스크립트를 사용하지 않아도^7^ 제 웹사이트의 모든 내용을 볼 수 있습니다.

### Trailing Slash

자바스크립트 없이 웹사이트가 잘 작동하는데, [Fetch as Google](https://www.google.com/webmasters/tools/googlebot-fetch)에서는 제 블로그를 긁어가지 못했습니다. 원인은 AWS CloudFront였습니다.

CloudFront에서는 디렉토리를 링크할 때 trailing slash를 추가하길 권장합니다^8^. 예를 들어서 [https://myeongjae.kim/blog](https://myeongjae.kim/blog) 로 접속을 하면 CloudFront는 이 접속을 [https://myeongjae.kim/blog/](https://myeongjae.kim/blog/)로 redirection을 합니다. 이 과정때문에 Fetch as Google은 페이지를 긁어가지 못했습니다(왜 못 긁어가는지는 잘 모르겠습니다). 디렉토리로 연결되는 모든 링크에 trailing slash를 추가하니 잘 작동합니다.

!['site:myeongjae.kim' 검색 결과](https://cdn.myeongjae.kim/blog/2018/09/google_search_result.png){width=611px}

### Open Graph

마지막으로 HTML의 head tag 사이에 Open Graph^9^ 포맷의 메타 정보들을 추가함으로써 페이스북과 카카오톡의 링크에 정보를 추가할 수 있습니다. vuejs에선 [vue-meta](https://github.com/declandewet/vue-meta) 플러그인을 사용하면 됩니다.

![🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈🙈](https://cdn.myeongjae.kim/blog/2018/09/fb-meta.png){width=517px}

Prerendering은 블로깅 시스템을 구축하는 과정에서 가장 많은 시간을 투자~(삽질)~한 주제였습니다. 도움이 되길 바라겠습니다.

------

1. [The easiest way to improve your Vue.js application. Part 1](https://codeburst.io/the-easiest-way-to-improve-your-vue-js-application-part-1-51f068652872)
2. [Headless Chrome: an answer to server-side rendering JS sites](https://developers.google.com/web/tools/puppeteer/articles/ssr)
3. [Pre-Render A Vue.js App (With Node Or Laravel)](https://vuejsdevelopers.com/2017/04/01/vue-js-prerendering-node-laravel/), SSR과 Prerendering 비교
4. [What's the shebang/hashbang (#!) in Facebook and new Twitter URLs for?](https://stackoverflow.com/questions/3009380/whats-the-shebang-hashbang-in-facebook-and-new-twitter-urls-for)
5. [Vue Router HTML5 History Mode](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations)
6. [How to Pre-render Vue.js Powered Websites With webpack](https://markus.oberlehner.net/blog/how-to-pre-render-vue-powered-websites-with-webpack/)
7. [How to disable JavaScript in chrome developer tools](https://stackoverflow.com/questions/13405383/how-to-disable-javascript-in-chrome-developer-tools)
8. [Customizing the URL Format for Files in CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/LinkFormat.html)
9. [http://ogp.me](http://ogp.me), [링크의 미리보기 제목, 설명, 이미지를 결정하는 open graph 태그](http://blog.ab180.co/open-graph-as-a-website-preview/)

