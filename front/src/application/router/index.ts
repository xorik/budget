import Vue from 'vue'
import VueRouter from 'vue-router'

/* eslint-disable @typescript-eslint/explicit-function-return-type */

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
