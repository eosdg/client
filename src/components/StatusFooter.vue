<template>
  <div id="footer">
    <p class="m-0" v-if="serverInfo">Serverversion: <b>{{ serverInfo.version }}</b></p>
    <b-skeleton v-else width="200px" class="mt-1"/>
    <p class="m-0" v-if="serverInfo">Nutzer online: <b>{{ serverInfo.usersnumber }}</b></p>
    <b-skeleton v-else width="200px" class="mt-1"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'statusFooter',
  computed: {
    ...mapGetters(['serverInfo'])
  },
}
</script>

<style scoped lang="scss">
#footer {
  background-color: #5b5b5b;
  color: white;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>
