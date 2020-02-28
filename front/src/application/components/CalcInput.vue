<template lang="pug">
  input.form-control(type="text" v-model="expr")
</template>

<script lang="ts">
import { Parser } from 'expr-eval'
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class CalcInput extends Vue {
  @Prop({
    required: true,
  })
  private value!: number | null

  private expr = ''

  @Watch('expr')
  private calc(): void {
    try {
      const value = Parser.parse(this.expr).evaluate()
      this.$emit('input', value)
    } catch (e) {
      this.$emit('input', '')
    }
  }

  @Watch('value')
  private onReset(): void {
    if (this.value === null) {
      this.expr = ''
    }
  }
}
</script>
