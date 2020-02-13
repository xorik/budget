/* eslint-disable @typescript-eslint/ban-ts-ignore */

import { NavbarPlugin, ModalPlugin } from 'bootstrap-vue'
import Vue from 'vue'
// @ts-ignore
import VueDayjs from 'vue-dayjs-plugin'
import { VNode } from 'vue/types/vnode'

import App from './application/App.vue'
import './application/icons'
import './application/registerServiceWorker'
import './application/services'
import { router } from './application/router'
import { store } from './application/store'

Vue.use(NavbarPlugin)
Vue.use(ModalPlugin)
Vue.use(VueDayjs)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h): VNode => h(App),
}).$mount('#app')
