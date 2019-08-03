<template>
  <div class="auth container mx-auto flex justify-center">
    <div class="w-full max-w-xs">
      <form @submit.prevent="handleSubmit()" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input 
            v-model="email"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" 
            type="text" 
            placeholder="john.snow@gmail.com">
          <small style="color: red;" v-if="errors && errors.email">{{ errors.email }}</small>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input 
            v-model="password"
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="password" 
            type="password" 
            placeholder="*************">
            <small style="color: red;" v-if="errors && errors.password">{{ errors.password }}</small>
        </div>

        <small class="block mb-4" v-if="errors && errors.general" style="color: red;">
          {{ errors.general }}
        </small>

        <div class="flex items-center justify-between">
          <button 
            class="btn bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none" 
            :class="{'opacity-50 cursor-not-allowed': loading}"
            type="submit">
            Login
          </button>
          <router-link to="/signup" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Create new account?
          </router-link>
        </div>
      </form>
      <Copyright />
    </div>
  </div>
</template>

<script>
import Copyright from '../components/Copyright.vue';
import axios from 'axios';

export default {
  name: 'Login',
  components: {
    Copyright,
  },
  data(){
    return{
      email: '',
      password: '',
      loading: false,
      errors: null,
    }
  },
  methods: {
    handleSubmit(){
      this.loading = true;
      const userData = {
        email: this.email,
        password: this.password
      };

      axios.post('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/login', userData)
        .then(res => {
          console.log(res);
          localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
          this.loading = false;

          // this.props.history.push('/');
          this.$router.push('/');
        })
        .catch(err => {
          this.errors = (err.response.data.errors) ? err.response.data.errors : err.response.data;
          this.loading = false;
        });
    }
  },
  metaInfo: {
    title: 'Login | Trecked: Your personal travel guide'
  }
}
</script>
