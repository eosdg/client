<template>
  <div id="app">
    <Topbar id="navbar" :username="username" @changeName="nameOpen=true"/>
    <div id="content" class="m-3 mb-5">
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

      <b-modal visible title="Benutzername" centered no-close-on-backdrop no-close-on-esc v-model="nameOpen">
        <template #modal-header>
          <div>
            <h4 class="m-0">Benutzername</h4>
          </div>
        </template>
        <label>Bitte gebe einen Benutzernamen ein:</label>
        <b-input placeholder="Benutzername" v-model="username" autocomplete="given-name" @keydown.native="test_keydown_handler"></b-input>
        <template #modal-footer>
          <b-button class="float-right" @click="setUsername" :disabled="username?username.length===0:true" variant="primary">Bestätigen</b-button>
        </template>
      </b-modal>
    </div>

  </div>

</template>
<script>
import io from 'socket.io/client-dist/socket.io'
import StatusFooter from './components/StatusFooter'
import { mapGetters } from 'vuex'
import semver from 'semver'
import {websocketURL} from "../config";
import Topbar from "@/components/Topbar";

const REQUIRED_SERVER_VERSION = '1.1' //z.B. '1.x || >=2.5.0 || 5.0.0 - 7.2.3'

export default {
  name: 'App',
  components: {
    Topbar,
    StatusFooter
  },
  computed: {
    ...mapGetters(['serverInfo', 'socket'])
  },
  data () {
    return {
      err: null,
      nameOpen: null,
      username: ""
    }
  },
  methods: {
    setUsername () {
      this.nameOpen = false;
      this.$ls.set('username', this.username)
      this.socket.emit('username', this.username)
    },
    test_keydown_handler(event) {
      if (event.keyCode === 13) {
        this.setUsername();
      }
    },
  },
  created () {
    this.username = this.$ls.get("username");
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    metaThemeColor.setAttribute("content", getComputedStyle(document.body).getPropertyValue('--primary'));

    const loc = window.location;
    const connectTo = (websocketURL || loc.protocol + "//" + loc.hostname + ":3420");
    this.$store.commit('setSocket', io(connectTo));
    this.socket.on('info', data => {
      this.$store.commit('setServerInfo', data)
      if (!semver.satisfies(this.serverInfo.version, REQUIRED_SERVER_VERSION)) this.err = {message: 'Die Serverversion erfüllt nicht die von der Oberfläche gestellten Bedingungen! (' + REQUIRED_SERVER_VERSION + ')'}
    });
    this.socket.on("sendUsername", () => {
      if (this.username) {
        this.socket.emit('username', this.username);
      } else {
        this.nameOpen = true;
      }
    });
    this.socket.on('err', data => this.err = data);
    this.socket.on('disconnect', () => {
      this.$router.push("/lost_connection")
    });
  }
}
</script>
<style lang="scss">
#navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 1000;
}

#content {
  margin-top: 80px;
}
</style>
