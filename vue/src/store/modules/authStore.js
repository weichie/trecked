import axios from 'axios';
import router from '@/router';

import { SET_LOADING, SET_ERRORS } from '../types';

const APIURL = process.env.VUE_APP_ROOT_API;

const state = {
   authenticated: false,
   credentials: {},
   likes: [],
   notifications: [],
   errors: null,
   token: null,
   loading: false,
};

const getters = {
   getToken: state => state.token,
   getUserCredentials: state => state.credentials,
   getUserLikes: state => state.likes,
   getUserNotifications: state => state.notifications,
   isAuthenticated: state => state.authenticated,
};

const actions = {
   loginUser: ({ commit, dispatch }, payload) => {
      commit(SET_LOADING, true);
      axios.post(`${APIURL}/login`, payload)
         .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            commit('setUserToken', res);
            commit(SET_ERRORS, null);
            commit('setAuthenticated', true);
            dispatch('setUserData');
         })
         .then(() => {
            commit(SET_LOADING, false);
            router.push('/');
         })
         .catch(err => {
            (err.response.data.errors) ? commit(SET_ERRORS, err.response.data.errors) : commit(SET_ERRORS, err.response.data);
            commit(SET_LOADING, false);
         });
   },
   signupUser: ({ commit }, payload) => {
      commit(SET_LOADING, true);
      axios.post(`${APIURL}/signup`, payload)
         .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            commit('setUserToken', res);
            commit(SET_ERRORS, null);
            commit(SET_LOADING, false);
            dispatch('setUserData');
            router.push('/');
         })
         .catch(err => {
            (err.response.data.errors) ? commit(SET_ERRORS, err.response.data.errors) : commit(SET_ERRORS, err.response.data);
            commit(SET_LOADING, false);
         });
   },
   setUserData: ({commit}, payload = null) => {
      if(payload){
         axios.defaults.headers.common['Authorization'] = payload;
      }
      axios.get(`${APIURL}/user`)
         .then(res => {
            commit('setUserCredentials', res.data.credentials);
            commit('setUserLikes', res.data.likes);
            commit('setUserNotifications', res.data.notifications);
            commit('setAuthenticated', true);
            commit(SET_LOADING, false);
         })
         .catch(err => {
            console.error(err);
         })
   },
   logOut: ({commit}) => {
      localStorage.removeItem('FBIdToken');
      delete axios.defaults.headers.common['Authorization'];
      commit('setAuthenticated', false);
      router.push('/');
   },
   setAuthenticated: ({commit}, payload) => {
      commit('setAuthenticated', payload);
   },
   uploadImage: ({commit, dispatch}, payload) => {
      commit(SET_LOADING, true);
      const config = {
         header: {
            'Content-Type': 'multipart/form-data'
         }
      }
      
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
      axios.post(`${APIURL}/user/image`, payload, config)
         .then(() => {
            dispatch('setUserData');
         })
         .catch(err => {
            console.log(payload);
            console.log('error');
            console.log(err);
         });
   },
   updateUserDetails: ({ commit, dispatch }, payload) => {
      commit(SET_LOADING, true);
      const token = localStorage.getItem('FBIdToken');
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${APIURL}/user`, payload)
         .then(() => {
            dispatch('setUserData', payload);
            commit(SET_LOADING, false);
         })
         .catch(err => {
            console.error(err);
         });
   },
};

const mutations = {
   loginUser: (state, payload) => {
      state.activeUser = payload;
   },
   setUserCredentials: (state, payload) => {
      state.credentials = payload;
   },
   setUserLikes: (state, payload) => {
      state.likes = payload;
   },
   setUserNotifications: (state, payload) => {
      state.notifications = payload;
   },
   setUserToken: (state, payload) => {
      state.token = payload.data.token;
   },
   setAuthenticated: (state, payload) => {
      state.authenticated = payload;
   },
};

export default {
   state,
   getters,
   actions,
   mutations,
}