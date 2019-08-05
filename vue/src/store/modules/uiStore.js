const state = {
   errors: null,
   loading: null,
};

const getters = {
   getErrors: state => state.errors,
   isLoading: state => state.loading,
};

const actions = {

};

const mutations = {
   setErrors: (state, payload) => {
      state.errors = payload;
   },
   setLoadingState: (state, payload) => {
      state.loading = payload;
   },
};

export default {
   state,
   getters,
   actions,
   mutations,
}