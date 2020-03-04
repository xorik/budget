<template lang="pug">
  div
    AddTransaction()

    button#add-transaction.btn.btn-primary.btn-lg(v-b-modal.add_transaction_modal)
      fa(icon="plus")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AddTransaction from './AddTransaction.vue'

@Component({
  components: { AddTransaction },
})
export default class AddTransactionButton extends Vue {}
</script>

<style lang="scss">
#add-transaction {
  border-radius: 100%;
  position: fixed;
  bottom: 10px;
  right: 10px;
}
</style>
