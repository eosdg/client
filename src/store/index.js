import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverInfo: null,
    socket: null
  },
  mutations: {
    setServerInfo(state, data) {
      state.serverInfo = {...state.serverInfo, ...data}
    },
    setSocket (state, data) {
      state.socket = data
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    serverInfo: state => state.serverInfo,
    socket: state => state.socket,
    version: () => process.env.PACKAGE_VERSION
  }
})
