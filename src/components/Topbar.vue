<template>
<b-navbar variant="primary" type="dark">
  <b-navbar-brand to="/">
    <h3 class="mb-n1">EOSDG</h3>
    <p class="mb-0" style="font-size:12px; opacity: 0.8">Epic Open Source Drinking Game</p>
  </b-navbar-brand>

  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="username" right>
        <b-dropdown-item @click="$emit('changeName')">Namen ändern</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  name: "Topbar",
  props: {
    username: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
