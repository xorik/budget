import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { Interval } from '@common/model/interval'

import { IntervalStorage } from '../../domain/service/interval-service'

const INTERVAL_MODULE = 'interval'

@Module({ name: INTERVAL_MODULE, namespaced: true })
class IntervalModule extends VuexModule implements IntervalStorage {
  public current: Interval | null = null

  @Mutation
  public setCurrent(interval: Interval): void {
    this.current = interval
  }
}

export { IntervalModule, INTERVAL_MODULE }
