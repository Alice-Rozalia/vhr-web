import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    routes: []
  },
  mutations: {
    initRoutes(state, data) {
      state.routes = data
    }
  },
  actions: {},
  modules: {}
})