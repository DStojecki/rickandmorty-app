import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isSearching: false,
      inputedName: ""
  },
  mutations: {
      changeIsSearching(state, payload)  {
          state.isSearching = payload
      },

      changeInputedName(state, payload) {
          state.inputedName =  payload
      }
  },
  actions: {
  },
  modules: {
  }
})
