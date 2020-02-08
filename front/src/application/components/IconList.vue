<template lang="pug">
  div
    div(v-for="(group, key) in icons")
      a(@click.prevent="currentGroup = (currentGroup === key) ? '' : key" href)
        h5
          | {{ group.label }}
          |
          fa(:icon="currentGroup === key ? 'caret-down' : 'caret-right'")
      div(v-if="currentGroup === key")
        div.btn.btn-link.text-secondary(v-for="icon in group.icons" @click="$emit('select', icon)")
          fa(:icon="icon" size="2x" fixed-width)

</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { icons } from '../../domain/icons'

@Component
export default class IconList extends Vue {
  private icons = icons
  private currentGroup = ''
}
</script>
