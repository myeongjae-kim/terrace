import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

// fontawesome configuration start
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser,
  faMapMarkerAlt,
  faUserTie,
  faEnvelope,
  faPenNib,
  faChild,
} from '@fortawesome/free-solid-svg-icons'

// import {
// } from '@fortawesome/free-regular-svg-icons'

import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faUser,
  faMapMarkerAlt,
  faUserTie,
  faEnvelope,
  faPenNib,

  faGithub,
  faChild,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// fontawesome configuration end

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');