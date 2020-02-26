import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { CategoryStat } from '@common/dto/stat.dto'
import { Category } from '@common/model/category'
import { Transaction } from '@common/model/transaction'

import { categoryModule, intervalModule } from '.'
import { StatStorage } from '../../domain/service/stat-service'

const STAT_MODULE = 'stat'

interface IntervalItem {
  category: Category
  current: number
  total: number
}

@Module({ name: STAT_MODULE, namespaced: true })
class StatModule extends VuexModule implements StatStorage {
  public stat: CategoryStat[] = []

  @Mutation
  public setStat(stat: CategoryStat[]): void {
    this.stat = stat
  }

  @Mutation
  public addTransaction(transaction: Transaction): void {
    const foundStat = this.stat.find(
      x => x.categoryId === transaction.categoryId,
    )
    if (foundStat !== undefined) {
      foundStat.sum += transaction.amount
    } else {
      this.stat.push({
        categoryId: transaction.categoryId,
        sum: transaction.amount,
      })
    }
  }

  public get items(): IntervalItem[] {
    if (
      intervalModule.current === null ||
      categoryModule.categories.length === 0
    ) {
      return []
    }

    return categoryModule.categories.map(category => {
      const budget = intervalModule.current?.budget.find(
        x => x.categoryId === category.id,
      )
      const stat = this.stat.find(x => x.categoryId === category.id)

      return {
        category,
        total: budget ? budget.amount : 0,
        current: stat ? Math.round(stat.sum) : 0,
      }
    })
  }
}

export { StatModule, STAT_MODULE, IntervalItem }
