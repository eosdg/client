<template>
  <div id="app" class="m-3">
    <router-view/>
  </div>
</template>
<script>
import io from "socket.io/client-dist/socket.io";

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      socket: null
    }
  },
  created () {
    this.socket = io('http://localhost:3420')
    this.socket.on('helo', data => console.log(data))
  }
}
</script>
<style lang="scss">

</style>
