<template>
  <div class="maxAndCenter">
    <div style="display: block; text-align:left; max-width: 900px; width: 100%">
      <div v-if="!question">
        <b-collapse :visible="amIHost">
          <h1>Spieleinstellungen</h1>
          <vue-json-form v-if="settingsSchema.properties.kategorien.enum.length >=1" :json="settingsSchema" :ui="uiSchema" :onSubmit="onStart">
            <b-button variant="primary" class="w-100" type="submit">Starten</b-button>
          </vue-json-form>
          <hr>
        </b-collapse>
        <div v-if="!amIHost">
          <h1>Warte, bis der Host das Spiel beginnt</h1>
        </div>
        <b-card>
          <h5>Gamecode: <b>{{ gameID }}</b></h5>
          <h5>Teile diesen Link mit deinen Freunden, um Ihnen das Beitretren zu ermöglichen:</h5>
          <a :href="link">{{ link }}</a>
        </b-card>
        <h4 class="mt-2">Teilnehmer:</h4>
        <b-list-group>
          <b-list-group-item v-for="(participant, index) of participants" :key="participant+index">{{ participant }}
          </b-list-group-item>
        </b-list-group>
      </div>
      <div v-else>
        <question :question="question" :amIHost="amIHost" :gameID="gameID"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueJsonForm from '@educorvi/vue-json-form'
import settingsSchema from '../forms/gamesettings/schema.json'
import ui from '../forms/gamesettings/ui.json'
import question from "../components/question"

export default {
  name: 'Game',
  components: { VueJsonForm, question },
  data () {
    return {
      amIHost: false,
      gameData: {},
      question: null,
      results: null,
      participants: [],
      settingsSchema: settingsSchema,
      uiSchema: ui
    }
  },
  computed: {
    ...mapGetters(['socket']),
    gameID () {
      return this.$route.params.gameID
    },
    link () {
      return window.location.href
    }
  },
  methods: {
    onStart (settings) {
      this.socket.emit("startGame", {gameID: this.gameID, settings});

    },
  },
  created () {
    this.socket.once('joinGame', res => {
      if (!res.succ) {
        this.$root.$bvToast.toast(res.message)
        this.$router.push("/")
      }
    })
    this.socket.emit('joinGame', this.gameID)
    this.socket.once('amIHost', data => this.amIHost = data)
    this.socket.emit('amIHost', this.gameID)
    this.socket.once('getGameData', data => this.gameData = data)
    this.socket.emit('getGameData', this.gameID)
    this.socket.on('participantsChanged', p => this.participants = p)
    this.socket.emit('enterGame', this.gameID)
    this.socket.on('question', q =>{
      this.question = q;
      this.results = null;
    });
  },
  watch: {
    gameData: {
      deep: true,
      handler: function () {
        function objectMap(object, mapFn) {
          return Object.keys(object).reduce(function(result, key) {
            result[key] = mapFn(object[key])
            return result
          }, {})
        }

        if (this.gameData) {
          this.settingsSchema.properties.kategorien.enum = Object.keys(this.gameData._questionSets)
          this.settingsSchema.properties.kategorien.default = Object.keys(this.gameData._questionSets)
          if(this.uiSchema.elements[1].options) this.uiSchema.elements[1].options.enumTitles = objectMap(this.gameData._questionSets, item => item.title+" ("+item.description+")")
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.socket.emit("leaveGame", this.gameID)
    next()
  }
}
</script>

<style scoped>

</style>
