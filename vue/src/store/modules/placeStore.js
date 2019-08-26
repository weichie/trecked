import axios from 'axios';
import { SET_LOADING } from '../types';

const APIURL = process.env.VUE_APP_ROOT_API;

const state = {
   places: null,
   likes: null,
};

const getters = {
   getPlaces: state => state.places,
   getLIkes: state => state.likes,
};

const actions = {
   getPlaces: ({commit}) => {
      commit(SET_LOADING, true);

      axios.get(`${APIURL}/places`)
         .then(res => {
            commit('setPlaces', res.data);
            commit(SET_LOADING, false);
         })
         .catch(err => {
            commit('setPlaces', []);
            commit(SET_LOADING, false);
            console.error(err);
         });
   },
   likePlace: ({commit}, payload) => {
      axios.get(`${APIURL}/place/${payload}/like`)
         .then(res => commit('likePlace', res.data))
         .catch(err => console.log(err));
   },
   unlikePlace: ({commit}, payload) => {
      axios.get(`${APIURL}/place/${payload}/unlike`)
         .then(res => commit('unlikePlace', res.data))
         .catch(err => console.log(err));
   }
};

const mutations = {
   setPlaces: (state, payload) => {
      state.places = payload;
   },
   likePlace: (state, payload) => {
      state.likes = payload;
   },
   unlikePlace: (state, payload) => {
      state.likes = payload;
   },
};

export default {
   state,
   getters,
   actions,
   mutations
}