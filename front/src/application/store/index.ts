import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'

import { CATEGORY_MODULE, CategoryModule } from './CategoryModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [CATEGORY_MODULE]: CategoryModule,
  },
})

const categoryModule = getModule(CategoryModule, store)

export { store, categoryModule }
