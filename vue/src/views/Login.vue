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
          placeholder="john.snpw@gmail.com">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input 
          v-model="password"
          class="appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
          id="password" 
          type="password" 
          placeholder="******************">
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue hover:bg-red text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">
          Login
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy; 2019 Weichie. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    handleSubmit(){
      console.log('Submitting form!');
    }
  },
  metaInfo: {
    title: 'Login | Trecked: Your personal travel guide'
  }
}
</script>
