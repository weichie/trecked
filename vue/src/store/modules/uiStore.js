import { SET_LOADING, SET_ERRORS } from '../types';

const state = {
   errors: null,
   loading: null,
};

const getters = {
   getErrors: state => state.errors,
   isLoading: state => state.loading,
};

const actions = {
   [SET_ERRORS]: ({ commit }, payload) => {
      commit(SET_ERRORS, payload);
   },
   [SET_LOADING]: ({ commit }, payload) => {
      commit(SET_LOADING, payload);
   }
};

const mutations = {
   [SET_ERRORS]: (state, payload) => {
      state.errors = payload;
   },
   [SET_LOADING]: (state, payload) => {
      state.loading = payload;
   },
};

export default {
   state,
   getters,
   actions,
   mutations,
}