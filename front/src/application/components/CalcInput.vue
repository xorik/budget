<template lang="pug">
  input.form-control(type="text" v-model="expr")
</template>

<script lang="ts">
import { Parser } from 'expr-eval'
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class CalcInput extends Vue {
  private expr = ''

  @Watch('expr')
  private calc(): void {
    try {
      const value = Parser.parse(this.expr).evaluate()
      this.$emit('input', value)
    } catch (e) {
      this.$emit('input', null)
    }
  }
}
</script>
