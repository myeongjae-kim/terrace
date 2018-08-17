import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import { loadFontCss } from './fonts.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

loadFontCss("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,700|Inconsolata");
loadFontCss("/css/SpoqaHanSans.css");
