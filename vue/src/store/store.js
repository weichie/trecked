import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/authStore'

export default new Vuex.Store({
  modules: {
    auth
  }
})
