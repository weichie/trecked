import axios from 'axios';
import router from '@/router';
import { SET_USERS, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

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
   getErrors: state => state.errors,
   getToken: state => state.token,
   getUserCredentials: state => state.credentials,
   getUserLikes: state => state.likes,
   getUserNotifications: state => state.notifications,
   isLoading: state => state.loading,
   isAuthenticated: state => state.authenticated,
};

const actions = {
   loginUser: ({ commit }, payload) => {
      commit('setLoadingState', true);
      axios.post('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/login', payload)
         .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem('FBIdToken', FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;
            commit('setUserToken', res);
            commit('setErrors', null);
            router.push('/');
         })
         .catch(err => {
            (err.response.data.errors) ? commit('setErrors', err.response.data.errors) : commit('setErrors', err.response.data);
            commit('setLoadingState', false);
         });
   },
   getUserData: () => {
      axios.get('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/user')
         .then(res => {
            commit('getUserData', payload);
         })
         .catch(err => {
            console.error(err);
         })
   }
};

const mutations = {
   loginUser: (state, payload) => {
      state.activeUser = payload;
   },
   setErrors: (state, payload) => {
      state.errors = payload;
   },
   setLoadingState: (state, payload) => {
      state.loading = payload;
   },
   setUserToken: (state, payload) => {
      state.token = payload.data.token;
   },
};

export default {
   state,
   getters,
   actions,
   mutations
}