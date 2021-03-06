import { Module, Mutation, VuexModule } from 'vuex-module-decorators'

import { CategoryStat } from '@common/dto/stat.dto'
import { Category } from '@common/model/category'
import { Transaction } from '@common/model/transaction'

import { categoryModule, intervalModule } from '.'
import { StatStorage } from '../../domain/service/stat-service'

const STAT_MODULE = 'stat'

interface StatItem {
  category: Category
  current: number
  total: number
  done: boolean
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

  public get items(): StatItem[] {
    if (
      intervalModule.current === null ||
      categoryModule.categories.length === 0
    ) {
      return []
    }

    return categoryModule.categories
      .map(category => {
        const budget = intervalModule.current?.budget.find(
          x => x.categoryId === category.id,
        )
        const stat = this.stat.find(x => x.categoryId === category.id)
        const total = budget ? budget.amount : 0
        // TODO: move round to the UI
        const current = stat ? Math.round(stat.sum) : 0
        const percent = total === 0 ? 0 : current / total

        return {
          category,
          total,
          current,
          done: !category.showProgress && percent > 0.9,
        }
      })
      .filter(item => item.total > 0)
      .sort((a, b) => {
        return (
          +a.done - +b.done ||
          +b.category.showProgress - +a.category.showProgress ||
          a.category.id - b.category.id
        )
      })
  }
}

export { StatModule, STAT_MODULE, StatItem }
