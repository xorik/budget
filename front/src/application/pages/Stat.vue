<template lang="pug">
  div
    BudgetProgress.mb-2(
      title="Total"
      :current="total.current"
      :total="total.total"
      :pos="progress"
    )

    hr
    i.text-muted.my-5(v-if="items.length === 0") No categories
    BudgetProgress.my-2(
      v-else
      v-for="item in items"
      :key="item.category.id"
      :title="item.category.title"
      bg="success"
      :icon="item.category.icon"
      :current="item.current"
      :total="item.total"
      :pos="progress"
    )

    AddTransaction
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AddTransaction from '../components/AddTransaction.vue'
import BudgetProgress from '../components/BudgetProgress.vue'
import { intervalModule, statModule } from '../store'
import { IntervalItem } from '../store/StatModule'

@Component({ components: { BudgetProgress, AddTransaction } })
export default class Stat extends Vue {
  private get items(): IntervalItem[] {
    return statModule.items
  }

  private get total(): object {
    return {
      current: Math.round(this.items.reduce((sum, x) => x.current + sum, 0)),
      total: this.items.reduce((sum, x) => x.total + sum, 0),
    }
  }

  private get progress(): number {
    return intervalModule.progress * 100
  }
}
</script>
