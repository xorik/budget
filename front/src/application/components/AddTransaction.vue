<template lang="pug">
  div
    h5 Add transaction

    .form-group
      label Category
      select.custom-select(v-model="form.categoryId")
        option(v-for="c in categories" :value="c.id") {{ c.title }}

    .form-group
      label Date
      input.form-control(type="date" v-model="form.date")

    .form-group
      label Amount
      CalcInput(v-model="form.amount")
      pre {{ form.amount }}

    .text-right
      button.btn.btn-outline-primary(@click="save") Add
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { Vue, Component, Watch } from 'vue-property-decorator'

import { Category } from '@common/model/category'

import { transactionService } from '../services'
import { categoryModule } from '../store'
import CalcInput from './CalcInput.vue'

interface Form {
  categoryId: number
  date: string
  amount: number | null
}

@Component({ components: { CalcInput } })
export default class AddTransaction extends Vue {
  private form = {
    categoryId: 0,
    date: dayjs().format('YYYY-MM-DD'),
    amount: null,
  }

  private get categories(): Category[] {
    return categoryModule.categories
  }

  @Watch('categories', { immediate: true })
  private updateCategory(): void {
    // Select the first category
    if (this.categories.length > 0) {
      this.form.categoryId = this.categories[0].id
    }
  }

  private async save(): Promise<void> {
    const { categoryId, date, amount } = this.form
    // TODO: validation
    await transactionService.create({ amount: amount || 0, categoryId, date })
    this.form.amount = null
  }
}
</script>
