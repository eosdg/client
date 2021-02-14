<template>
  <div id="footer" class="text-center">
    <p class="m-0" v-if="serverInfo">Server: <b>{{ serverInfo.version }}</b></p>
    <b-skeleton v-else width="200px" class="mt-1"/>
    <p class="m-0 mr-1 ml-1" v-if="serverInfo">Nutzer online: <b>{{ serverInfo.usersnumber }}</b></p>
    <b-skeleton v-else width="200px" class="mt-1"/>
    <p class="m-0">Client: <b>{{ version }}</b></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'statusFooter',
  computed: {
    ...mapGetters(['serverInfo', "version"])
  },
}
</script>

<style scoped lang="scss">
#footer {
  background-color: #5b5b5b;
  color: white;
  display: flex;
  justify-content: space-between;
  padding-left: 10%;
  padding-right: 10%;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
</style>
