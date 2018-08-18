import Vue from 'vue';
import Router from 'vue-router';
import About from './components/About.vue'
import Blog from './components/Blog.vue'
// import Places from './components/Places.vue'
// Asynchronously import components
const Places = () => import('./components/Places.vue')

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
    },
    {
      path: '/places',
      name: 'Places',
      component: Places
    }

  ]
})
