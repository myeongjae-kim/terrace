import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import WebFont from 'webfontloader';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

// Asynchronously load web fonts
(function () {
WebFont.load({
    google: {
      families: ['Source Sans Pro:300,700', 'Inconsolata']
    },
    custom: {
      families: ['Spoqa Han Sans'],
      //urls: ['/css/SpoqaHanSans.css']
      urls: ['//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css']
    }
  });
}());
