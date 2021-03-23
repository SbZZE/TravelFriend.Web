import { createApp } from 'vue'
//import Vue from 'vue'
import Vuex from 'vuex'

createApp.use(Vuex)

export default new Vuex.Store({
  state: {
    storeInfo: {}
  },
  mutations: {
    setStoreInfo(state, obj) {
      state.storeInfo = obj
    }
  },
  actions: {

  }
})
