import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMeta from 'vue-meta'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import '@/assets/scss/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueMeta)

dayjs.extend(relativeTime)

Vue.filter('fromNow', value => {
  if (!value) return ''
  return dayjs(value).fromNow()
});

new Vue({
  router,
  store,
  VueMeta,
  render: h => h(App)
}).$mount('#app')
