<template>
<div class="maxAndCenter">
  <div style="display: block; text-align:left; max-width: 900px; width: 100%">
    <div v-if="!question">
      <div v-if="amIHost">
        <h1>Spieleinstellungen</h1>
      </div>
      <div v-else>
        <h1>Warte, bis der Host das Spiel beginnt</h1>
      </div>
      <b-card>
        <h5>Teile diesen Link mit deinen Freunden, um Ihnen das Beitretren zu ermöglichen:</h5>
        <a :href="link">{{link}}</a>
      </b-card>
      <h4>Teilnehmer:</h4>
      <ul>
        <li v-for="(participant, index) of participants" :key="participant+index">{{participant}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
name: "Game",
  data () {
    return {
      link: "",
      amIHost: false,
      question: null,
      participants: []
    }
  },
  computed: {
    ...mapGetters(['socket']),
    gameID () {
      return this.$route.params.gameID

    }
  },
  created () {
    this.link = window.location.href
    this.socket.once('amIHost', data => this.amIHost = data)
    this.socket.emit('amIHost', this.gameID)
    this.socket.once('getGameData', data => this.amIHost = data)
    this.socket.emit('getGameData', this.gameID)
    this.socket.on('participantsChanged', p => this.participants = p)
    this.socket.emit('enterGame', this.gameID)

  }
}
</script>

<style scoped>

</style>
