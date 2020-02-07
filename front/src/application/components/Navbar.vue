<template lang="pug">
  div
    b-navbar(toggleable='lg' type='dark' variant='dark')
      b-navbar-brand(to="/")
        fa.text-success(icon="money-bill-wave")
        |
        | Budget
      b-navbar-toggle(target='nav-collapse')
      b-collapse#nav-collapse(is-nav='')
        b-navbar-nav
          b-nav-item(:to="{name: 'categories'}")
            fa(icon="list")
            |
            | Categories
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Navbar extends Vue {}
</script>
