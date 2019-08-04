import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import VueMeta from 'vue-meta'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import jwtDecode from 'jwt-decode'

import '@/assets/scss/tailwind.css'

Vue.config.productionTip = false

Vue.use(VueMeta)

dayjs.extend(relativeTime)

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 > Date.now()){
    // window.location.href= '/login'
    authenticated = true;
  } else {
    authenticated = false;
  }
}

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authenticated) next('login');
  // else if (!requiresAuth && authenticated) next('home');
  else next();
});

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
