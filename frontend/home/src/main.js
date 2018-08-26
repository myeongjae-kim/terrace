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
      urls: ['//cdn.jsdelivr.net/font-spoqa-han-sans/2.1.0/css/SpoqaHanSans-kr.css']
    }
  });
}());
