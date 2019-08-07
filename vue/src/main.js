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

const token = localStorage.FBIdToken;
if(token){
  console.log(token);
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch('setAuthenticated', false);
  } else {
    const bearerToken = localStorage.getItem('FBIdToken');
    store.dispatch('setAuthenticated', true);
    store.dispatch('setUserData', bearerToken);
  }
};

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !store.getters.isAuthenticated) next('login');
  // else if (!requiresAuth && firstCheck) next('home');
  else next();
});

Vue.filter('fromNow', value => {
  if (!value) return ''
  return dayjs(value).fromNow()
});

Vue.filter('capitalize', value => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  VueMeta,
  render: h => h(App)
}).$mount('#app')
