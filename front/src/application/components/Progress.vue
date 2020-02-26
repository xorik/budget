<template lang="pug">
  .position-relative
    .progress
      .pos(:style="{left: current + '%'}")
      .progress-bar(:style="{width: value + '%'}" :class="'bg-' + bg")

</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Progress extends Vue {
  @Prop({ type: Number, required: true })
  private value!: number

  @Prop({ type: Number, required: true })
  private current!: number

  @Prop({ type: String, required: false, default: '' })
  private bg!: string
}
</script>

<style scoped>
.pos {
  display: block;
  width: 0.2rem;
  height: 1.2rem;
  background: #555;
  position: absolute;
  top: -0.1rem;
  margin-left: -0.1rem;
}
</style>
