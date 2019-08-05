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
               <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Password
               </label>
               <input 
                  v-model="password"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password" 
                  type="password" 
                  placeholder="*************">
               <small style="color: red;" v-if="errors && errors.password">{{ errors.password }}</small>
            </div><div class="mb-4">
               <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Confirm Password
               </label>
               <input 
                  v-model="confirmPassword"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="*************">
               <small style="color: red;" v-if="errors && errors.confirmPassword">{{ errors.confirmPassword }}</small>
            </div><div class="mb-4">
               <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Handle
               </label>
               <input 
                  v-model="handle"
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="handle" 
                  type="text" 
                  placeholder="King of the north">
               <small style="color: red;" v-if="errors && errors.handle">{{ errors.handle }}</small>
            </div>
            <div class="flex items-center justify-between">
               <button 
                  class="btn bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none" 
                  :class="{'opacity-50 cursor-not-allowed': loading}"
                  type="submit">
                  Sign up
               </button>
               <router-link to="/login" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Login?
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
   name: 'Signup',
   components: {
      Copyright,
   },
   data() {
      return{
         email: '',
         password: '',
         confirmPassword: '',
         handle: '',
      };
   },
   methods: {
      handleSubmit(){
         const userData = {
            email: this.email,
            password: this.password,
            confirmPassword: this.confirmPassword,
            handle: this.handle,
         };
         this.$store.dispatch('signupUser', userData);
      }
   },
   computed: {
      errors(){
         return this.$store.getters.getErrors;
      },
      loading(){
         return this.$store.getters.isLoading;
      }
   },
   metaInfo: {
      title: 'Signup | Trecked: Your personal travel guide',
   },
};
</script>
