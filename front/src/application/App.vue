<template lang="pug">
  #app
    Navbar
    .container
      router-view
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'

import Navbar from './components/Navbar'

@Component({
  components: { Navbar },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
</style>
