<template>
  <div class="home" style="display: flex; justify-content: center">
    <b-card class="text-center">
      <b-button variant="primary" @click="createGame()"><b-spinner v-if="waitCreate"/><span v-else>Neues Spiel</span></b-button>
      <hr>
      <b-input v-model="joinCode" placeholder="Code" autocomplete="off" @keydown.native="test_keydown_handler"></b-input>
      <b-button variant="primary" @click="joinGame()" class="mt-1" ><b-spinner v-if="waitJoin"/><span v-else>Spiel beitreten</span></b-button>
    </b-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  name: 'Home',
  data () {
    return {
      joinCode: "",
      waitJoin: false,
      waitCreate: false
    }
  },
  components: {
  },
  methods: {
    createGame() {
      this.waitCreate = true
      const context = this;
      this.socket.once('createdGame', id => {
        console.log(id)
        context.waitCreate = false
        this.$router.push('/game/' + id)
      })
      this.socket.emit('createGame')
    },
    joinGame() {
      this.joinCode = this.joinCode.toLowerCase()
      this.socket.emit('joinGame', this.joinCode)
      this.waitJoin = true
      const context = this;
      this.socket.once('joinGame', res => {
        console.log(res)
        context.waitJoin = false
        if (res.succ) {
          this.$router.push('/game/' + res.id)
        } else {
          this.$root.$bvToast.toast(res.message, {title: "Fehler"})
          this.joinCode = ''
        }
      })
      this.socket.emit('joinGame', this.joinCode)
    },
    test_keydown_handler(event) {
      if (event.keyCode === 13) {
        this.joinGame();

      }
    },
  },
  computed: {
    ...mapGetters(['socket'])
  }
}
</script>

<style scoped>
button {
  width: 100%;
}
</style>
