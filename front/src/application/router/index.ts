import Vue from 'vue'
import VueRouter from 'vue-router'

/* eslint-disable @typescript-eslint/explicit-function-return-type */

Vue.use(VueRouter)

const routes = [
  {
    path: '/categories',
    name: 'categories',
    component: () =>
      import(/* webpackChunkName: "categories" */ '../pages/Categories.vue'),
  },
  {
    path: '/budget',
    name: 'budget',
    component: () =>
      import(/* webpackChunkName: "budget" */ '../pages/Budget.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes,
})

export { router }
