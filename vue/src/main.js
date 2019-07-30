import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMeta from 'vue-meta'

import '@/assets/scss/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueMeta)

new Vue({
  router,
  store,
  VueMeta,
  render: h => h(App)
}).$mount('#app')
