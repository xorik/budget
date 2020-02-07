import Vue from 'vue'
import { VNode } from 'vue/types/vnode'

import App from './application/App.vue'
import './application/registerServiceWorker'
import { router } from './application/router'
import { store } from './application/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h): VNode => h(App),
}).$mount('#app')
