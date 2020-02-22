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
      input.form-control(type="number" v-model.number="form.amount")

    .text-right
      button.btn.btn-outline-primary(@click="save") Add
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import { Category } from '@common/model/category'

import { transactionService } from '../services'
import { categoryModule } from '../store'

interface Form {
  categoryId: number
  date: string
  amount: number | null
}

@Component
export default class AddTransaction extends Vue {
  private form = {
    categoryId: 0,
    date: '2020-02-01',
    amount: null,
  }

  private get categories(): Category[] {
    return categoryModule.categories
  }

  @Watch('categories', { immediate: true })
  private updateCategory(): void {
    if (this.categories.length > 0) {
      this.form.categoryId = this.categories[0].id
    }
  }

  private save(): void {
    const { categoryId, date, amount } = this.form
    // TODO: validation
    transactionService.create({ amount: amount || 0, categoryId, date })
  }
}
</script>
