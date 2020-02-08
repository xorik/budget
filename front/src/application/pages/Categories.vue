<template lang="pug">
  div
    h3
      | Categories
      |
      button.btn.btn-outline-primary.rounded-pill.float-right(@click="openModal()")
        fa(icon="plus")

    i.text-muted(v-if="categories === null") Loading...
    i.text-muted.my-5(v-else-if="categories.length === 0") No categories

    .d-flex.d-flex-row.justify-content-between.align-items-center.my-3(v-else v-for="category in categories")
      fa.text-secondary(:icon="category.icon" fixed-width size="2x")
      div {{ category.title }}
      .btn-group
        a.btn.btn-link.text-secondary.p-1(@click="openModal(category)")
          fa(icon="pen" fixed-width)
        a.btn.btn-link.text-danger.p-1
          fa(icon="times" fixed-width)

    CategoryModal(v-model="modalItem" @save="save")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { CategoryCreateDto } from '../../../../_common/dto/category.dto'
import { Category } from '../../../../_common/model/category'
import CategoryModal from '../components/CategoryModal.vue'
import { categoryService } from '../services'

@Component({
  components: { CategoryModal },
})
export default class Categories extends Vue {
  private categories: Category[] | null = null
  private modalItem: Category | null = null

  private async created(): Promise<void> {
    this.categories = await categoryService.list()
  }

  private openModal(category: Category | null = null): void {
    this.modalItem = category
    this.$nextTick(() => this.$bvModal.show('category_modal'))
  }

  private async save(data: CategoryCreateDto): Promise<void> {
    if (this.modalItem === null) {
      this.categories?.push(await categoryService.create(data))
      return
    }

    const updatedCategory = await categoryService.update(
      this.modalItem.id,
      data,
    )

    const i = this.categories?.findIndex(v => v.id === this.modalItem?.id) || 0
    this.categories?.splice(i, 1, updatedCategory)
  }
}
</script>
