<template lang="pug">
  div
    h3.float-right
      small.text-muted(v-if="currentInterval")
        | {{ $date(currentInterval.start).format('DD MMM YYYY') }}
        | -
        | {{ $date(currentInterval.end).format('DD MMM YYYY') }}
    h3(v-if="currentInterval") {{ currentInterval.title }}

    h5.text-right Total:
      span.text-success.ml-1 {{ sum }}€

    .form-group(v-for="c in intervalItems")
      .input-group
        .input-group-prepend
          .input-group-text
            fa.text-secondary.mr-1(:icon="c.category.icon" fixed-width size="lg")
            | {{ c.category.title }}
        input.form-control.text-right(type="number" v-model.number="c.amount")

    .text-right
      button.btn.btn-outline-primary(@click="save") Save
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import { Category } from '@common/model/category'
import { Interval } from '@common/model/interval'

import { intervalService } from '../services'
import { categoryModule, intervalModule } from '../store'

interface IntervalItem {
  category: Category
  amount: number
}

@Component
export default class Budget extends Vue {
  private intervalItems: IntervalItem[] = []

  private get categories(): Category[] {
    return categoryModule.categories
  }

  private get currentInterval(): Interval | null {
    return intervalModule.current
  }

  private get sum(): number {
    return this.intervalItems.reduce((sum, x) => x.amount + sum, 0)
  }

  private save(): void {
    if (intervalModule.current === null) {
      return
    }
    const data = this.intervalItems
      .filter(x => x.amount > 0)
      .map(x => ({
        categoryId: x.category.id,
        amount: x.amount,
      }))
    intervalService.save(intervalModule.current.id, data)
  }

  @Watch('categories')
  @Watch('currentInterval', { immediate: true })
  private updateList(): void {
    if (
      intervalModule.current === null ||
      categoryModule.categories.length === 0
    ) {
      return
    }

    this.intervalItems = categoryModule.categories.map(category => {
      const budget = intervalModule.current?.budget.find(
        x => x.categoryId === category.id,
      )

      return {
        category,
        amount: budget ? budget.amount : 0,
      }
    })
  }
}
</script>
