import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    routes: []
  },
  getters: {
  },
  mutations: {
    initRoutes(state, data) {
      state.routes = data
    }
  },
  actions: {},
  modules: {}
})