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

    .form-group(v-for="c in items")
      .input-group
        .input-group-prepend
          .input-group-text
            fa.text-secondary.mr-1(:icon="c.category.icon" fixed-width size="lg")
            | {{ c.category.title }}
        input.form-control.text-right(type="number" v-model.number="c.total")

    .text-right
      button.btn.btn-outline-primary(@click="save") Save
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { Interval } from '@common/model/interval'

import { intervalService } from '../services'
import { intervalModule, statModule } from '../store'
import { StatItem } from '../store/StatModule'

@Component
export default class Budget extends Vue {
  // TODO: fix, save to data
  private get items(): StatItem[] {
    return statModule.items
  }

  private get currentInterval(): Interval | null {
    return intervalModule.current
  }

  private get sum(): number {
    return this.items.reduce((sum, x) => x.total + sum, 0)
  }

  private save(): void {
    if (intervalModule.current === null) {
      return
    }
    const data = this.items
      .filter(x => x.total > 0)
      .map(x => ({
        categoryId: x.category.id,
        amount: x.total,
      }))
    intervalService.save(intervalModule.current.id, data)
  }
}
</script>
