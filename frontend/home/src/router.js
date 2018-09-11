import Vue from 'vue';
import Router from 'vue-router';

import About from './components/About.vue'

// Asynchronously import components
const Blog = () => import('./components/Blog.vue')
const Places = () => import('./components/Places.vue')
const NotFound = () => import('./components/NotFound.vue')

Vue.use(Router)

export default new Router({
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
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
  ]
})
