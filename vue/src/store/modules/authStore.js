import axios from 'axios';
import router from '@/router';

import { SET_LOADING, SET_ERRORS } from '../types';

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
      axios.post('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/login', payload)
         .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            commit('setUserToken', res);
            commit(SET_ERRORS, null);
            commit(SET_LOADING, false);
            commit('setAuthenticated', true);
            dispatch('setUserData');
            router.push('/');
         })
         .catch(err => {
            (err.response.data.errors) ? commit(SET_ERRORS, err.response.data.errors) : commit(SET_ERRORS, err.response.data);
            commit(SET_LOADING, false);
         });
   },
   signupUser: ({ commit }, payload) => {
      commit(SET_LOADING, true);
      axios.post('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/signup', payload)
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
      axios.get('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/user')
         .then(res => {
            commit('setUserCredentials', res.data.credentials);
            commit('setUserLikes', res.data.likes);
            commit('setUserNotifications', res.data.notifications);
            commit('setAuthenticated', true);
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
   }
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