import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isSearching: false,
      inputedName: "",
      favouriteTable: false,
      page: 1,
  },
  mutations: {
      changePage(state, payload) {
          state.page = payload
      },

      changeFavouriteTable(state, payload) {
          state.favouriteTable = payload
      },

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
