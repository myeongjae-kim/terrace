# [Terrace] 4. Routing

```
npm install --save vue-router
```

`App.vue`
```html
<template>
  <div id="app">
    <p>
      <router-link to="/">About</router-link>
      &nbsp;
      <router-link to="/blog">Blog</router-link>
    </p>

    <p>
      <router-view></router-view>
    </p>

    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>
```

`main.js`

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```


`router.js`

```javascript
import Vue from 'vue';
import Router from 'vue-router';

import About from './components/About.vue'
import Blog from './components/Blog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name :'About',
      component: About
    },
    {
      path: '/blog',
      name :'Blog',
      component: Blog
    },
  ]
});
```

`About.vue`

```javascript
<template>
  <p>About Component</p>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
</style>
```

`Blog.vue`

```javascript
<template>
  <p>Blog Component</p>
</template>

<script>
export default {
  name: 'Blog'
}
</script>

<style scoped>
</style>
```


라우팅은 원래 서버에서 했던 것.

URI(uri가 뭔지 설명)에 따라 다른 핸들러가 처리했다.

요새는 프론트엔드로 하는 방법이 생김.

65min 영상에서 vue-router 사용. 우리도 똑같이 사용할 것.

About 페이지랑 Blog페이지 만들기.

디자인은 꼭 내껏처럼 따라할 필요 없다. 제일 간단하긴 한데, 심플한 웹페이지 모아놓은 사이트 디자인 참고하라고 알려주기

제 웹사이트 디자인, mobile화면과 desktop화면이 거의 차이가 안나게 디자인함.

많이 다르게 해도 좋다. media query 설명.

숙제:
- 웹페이지 그럴싸하게 구성해오기
  - `vue-router` 사용해서 routing 하기.
- AWS EC2 instance 생성해오기
  - t2.micro 인스턴스
  - Amazon Linux 2
  - ssh로 ec2에 접속해보기
    - https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html
- Github repo 만들어서 올리기
  - https://www.huskyhoochu.com/issue-based-version-control-101
  - https://www.huskyhoochu.com/issue-based-version-control-201