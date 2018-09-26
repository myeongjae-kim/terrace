import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta'

import About from './components/About.vue'
import Blog from './components/Blog.vue'

// Asynchronously import components
const Places = () => import('./components/Places.vue')
const Musings = () => import('./components/Musings.vue')

const NotFound = () => import('./components/NotFound.vue')

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    { path: '/main', redirect: '/' },
    { path: '/about', redirect: '/' },
    { path: '/home', redirect: '/' },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
      children: [
        {
          path: ':year/:month/:day/:title',
        }
      ]
    },

    {
      path: '/places',
      name: 'Places',
      component: Places
    },

    {
      path: '/musings',
      name: 'Musings',
      component: Musings
    },

    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },

    { path: '*', redirect: '/404' },
  ]
})
