import Vue from 'vue'
import Vuex from 'vuex'
import { getModule } from 'vuex-module-decorators'

import { CATEGORY_MODULE, CategoryModule } from './CategoryModule'
import { INTERVAL_MODULE, IntervalModule } from './IntervalModule'
import { STAT_MODULE, StatModule } from './StatModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    [CATEGORY_MODULE]: CategoryModule,
    [INTERVAL_MODULE]: IntervalModule,
    [STAT_MODULE]: StatModule,
  },
})

const categoryModule = getModule(CategoryModule, store)
const intervalModule = getModule(IntervalModule, store)
const statModule = getModule(StatModule, store)

export { store, categoryModule, intervalModule, statModule }
