<template>
  <div id="app" class="m-3">
    <router-view v-if="serverInfo && !err"/>
    <div v-else-if="!err" class="maxAndCenter">
      <div class="text-center">
        <b-spinner variant="primary"/>
        <p class="text-muted">Verbinden...</p>
      </div>
    </div>
    <div class="maxAndCenter text-center" v-else>
      <b-card style="width: fit-content" header="Verbindungsfehler">
        <h1>
          <b-icon-exclamation-circle variant="danger"></b-icon-exclamation-circle>
        </h1>
        <p>Bei der Verbindung zum Server ist ein Fehler aufgetreten:</p>
        <p><b>{{ err.message }}</b></p>
      </b-card>
    </div>
    <status-footer/>
  </div>

</template>
<script>
import io from 'socket.io/client-dist/socket.io'
import StatusFooter from '@/components/StatusFooter'
import { mapGetters } from 'vuex'
import semver from 'semver'

const REQUIRED_SERVER_VERSION = '0.x' //z.B. '1.x || >=2.5.0 || 5.0.0 - 7.2.3'

export default {
  name: 'App',
  components: {
    StatusFooter
  },
  computed: {
    ...mapGetters(['serverInfo', 'socket'])
  },
  data () {
    return {
      err: null
    }
  },
  methods: {},
  created () {
    this.$store.commit('setSocket', io('http://192.168.178.31:3420'))
    this.socket.on('info', data => {
      this.$store.commit('setServerInfo', data)
      if (!semver.satisfies(this.serverInfo.version, REQUIRED_SERVER_VERSION)) this.err = { message: 'Die Serverversion erfüllt nicht die von der Oberfläche gestellten Bedingungen! (' + REQUIRED_SERVER_VERSION + ')' }
    })
    this.socket.on('err', data => this.err = data)
  }
}
</script>
<style lang="scss">

</style>
