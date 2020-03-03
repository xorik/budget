<template lang="pug">
  div
    .row
      h5.col.mb-0.text-secondary
        fa.text-muted(v-if="icon" :icon="icon" fixed-width)
        |
        | {{ title }}
      h5.col.col-auto.mb-0.text-right {{ current }}€
    .row.align-items-center(v-if="showProgress")
      .col.col-10
        Progress(:value="percent" :current="pos" :bg="bg")
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

  private get percent(): number {
    if (this.total === 0) {
      return 0
    }

    return (this.current / this.total) * 100
  }
}
</script>
