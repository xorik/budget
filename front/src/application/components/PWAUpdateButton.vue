<template lang="pug">
  CollapseTransition(:duration="1000")
    div(v-show="updateExists")
      .alert.alert-secondary.d-flex.mb-0
        .col New version available
        .col.text-right
          a.alert-link(@click.prevent="refreshApp") Refresh page
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Vue, Component } from 'vue-property-decorator'
// @ts-ignore
import { CollapseTransition } from 'vue2-transitions'

@Component({ components: { CollapseTransition } })
export default class PWAUpdateButton extends Vue {
  private updateExists = false
  private registration: any = null

  private created(): void {
    document.addEventListener('swUpdated', this.showRefreshUI.bind(this), {
      once: true,
    })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }

  private showRefreshUI(e: any): void {
    this.registration = e.detail
    this.updateExists = true
  }

  private refreshApp(): void {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }
}
</script>
