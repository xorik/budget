<template lang="pug">
  div
    .row
      h5.col.mb-0
        fa.text-muted(v-if="icon && !done" :icon="icon" fixed-width)
        fa-layers(v-else-if="icon && done" fixed-width)
          fa.text-muted(:icon="icon")
          fa(icon="check" transform="grow-7")
        span.ml-2(:class="textClass") {{ title }}
      h5.col.col-auto.mb-0.text-right(:class="textClass") {{ current }}€
    .row.align-items-center(v-if="showProgress")
      .col.col-10
        Progress(:value="percent" :current="pos" :bg="bg" :style="{width: `${width}%`}")
      .col.text-right.text-muted {{ total }}€
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import Progress from './Progress.vue'

@Component({ components: { Progress } })
export default class BudgetProgress extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: String, required: false, default: '' })
  private bg!: string

  @Prop({ type: Number, required: true })
  private current!: number

  @Prop({ type: Number, required: true })
  private total!: number

  @Prop({ type: Number, required: true })
  private pos!: number

  @Prop({ type: String, required: false, default: null })
  private icon!: string | null

  @Prop({ required: false, default: true })
  private showProgress!: boolean

  @Prop({ required: false, default: null })
  private max!: number | null

  private get done(): boolean {
    return !this.showProgress && this.percent > 90
  }

  private get textClass(): string {
    return this.done ? 'text-muted' : 'text-secondary'
  }

  private get percent(): number {
    if (this.total === 0) {
      return 0
    }

    return (this.current / this.total) * 100
  }

  private get width(): number {
    if (this.max === null || this.max === 0) {
      return 100
    } else if (!this.showProgress) {
      return 0
    }

    return Math.pow(this.total / this.max, 0.7) * 100
  }
}
</script>
