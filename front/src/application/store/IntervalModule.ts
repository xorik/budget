import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { Interval } from '@common/model/interval'

import { currentProgress } from '../../domain/helper/date-helper'
import { IntervalStorage } from '../../domain/service/interval-service'

const INTERVAL_MODULE = 'interval'

@Module({ name: INTERVAL_MODULE, namespaced: true })
class IntervalModule extends VuexModule implements IntervalStorage {
  public current: Interval | null = null

  @Mutation
  public setCurrent(interval: Interval): void {
    this.current = interval
  }

  public get progress(): number {
    if (this.current === null) {
      return 0
    }
    return currentProgress(this.current.start, this.current.end)
  }
}

export { IntervalModule, INTERVAL_MODULE }
