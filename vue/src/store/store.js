import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/authStore'
import place from './modules/placeStore';
import ui from './modules/uiStore';

export default new Vuex.Store({
  modules: {
    auth,
    place,
    ui,
  }
})
