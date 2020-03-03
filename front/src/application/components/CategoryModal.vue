<template lang="pug">
  b-modal#category_modal(
    :title="(value === null ? 'Create' : 'Edit') + ' category'"
    :ok-title="value === null ? 'Create' : 'Edit'"
    @show="show()"
    @ok="save()"
  )
    .form-group
      label Title
      input.form-control(type="text" v-model="title")

    .form-check.mb-2
      input#show-progress.form-check-input(type="checkbox" v-model="showProgress")
      label.form-check-label(for="show-progress") Show progress bars

    .form-group
      label Icon
      button.btn.btn-outline-primary.mx-2(type="button" @click="showList = !showList")
        fa(:icon="icon" size="lg" fixed-width)

    IconList(v-if="showList" @select="icon = $event; showList = false")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { CategoryCreateDto } from '@common/dto/category.dto'
import { Category } from '@common/model/category'

import IconList from './IconList.vue'

@Component({
  components: { IconList },
})
export default class CategoryModal extends Vue {
  @Prop()
  private value!: Category | null

  private title = ''
  private showProgress = true
  private icon = 'list'
  private showList = false

  private show(): void {
    if (this.value === null) {
      this.title = ''
      this.icon = 'file'
      this.showProgress = true
    } else {
      this.title = this.value.title
      this.icon = this.value.icon
      this.showProgress = this.value.showProgress
    }
  }

  private save(): void {
    const category: CategoryCreateDto = {
      title: this.title,
      icon: this.icon,
      showProgress: this.showProgress,
    }
    this.$emit('save', category)
  }
}
</script>
