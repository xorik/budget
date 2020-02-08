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

    .form-group
      label Icon
      button(type="button").btn.btn-outline-primary.mx-2(@click="showList = !showList")
        fa(:icon="icon" size="lg" fixed-width)

    IconList(v-if="showList" @select="icon = $event; showList = false")
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { CategoryCreateDto } from '../../../../_common/dto/category.dto'
import { Category } from '../../../../_common/model/category'
import IconList from './IconList.vue'

@Component({
  components: { IconList },
})
export default class CategoryModal extends Vue {
  @Prop()
  private value!: Category | null

  private title = ''
  private icon = 'list'
  private showList = false

  private show(): void {
    if (this.value === null) {
      this.title = ''
      this.icon = 'file'
    } else {
      this.title = this.value.title
      this.icon = this.value.icon
    }
  }

  private save(): void {
    const category: CategoryCreateDto = { title: this.title, icon: this.icon }
    this.$emit('save', category)
  }
}
</script>
