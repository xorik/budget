import Vue from 'vue'
import App from './application/App.vue'
import './application/registerServiceWorker'
import router from './application/router'
import store from './application/store'
import { VNode } from 'vue/types/vnode'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h): VNode => h(App),
}).$mount('#app')
