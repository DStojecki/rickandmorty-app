import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      isSearching: false,
      inputedName: "",
      favouriteTable: false,
      page: 1,
      tableHeight: 0,
  },
  mutations: {
      changeTableHeight(state, payload) {
          state.tableHeight = payload
      },

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
