<template lang="pug">
  #app
    Navbar
    .container.mt-3
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
$grid-gutter-width: 10px;
@import '~bootswatch/dist/lumen/variables';
@import '~bootstrap/scss/bootstrap';
@import '~bootswatch/dist/lumen/bootswatch';
@import 'node_modules/bootstrap-vue/src/index.scss';
</style>
