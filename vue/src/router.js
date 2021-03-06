import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },{
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        requiresAuth: true,
      },
    }, {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    }, {
      path: '/signup',
      name: 'signup',
      component: () => import(/* webpackChunkName: "signup" */ './views/Signup.vue'),
    }, {
      path: '/user/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "Profile" */ './views/Profile.vue'),
    },
  ]
})
