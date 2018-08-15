import Vue from 'vue';
import Router from 'vue-router';
import About from './components/About.vue'
import Blog from './components/Blog.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    }
  ]
})
