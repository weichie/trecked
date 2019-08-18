<template>
   <nav class="navbar">
      <div class="logo">
         <router-link to="/">
            <!-- SVG ICON HERE -->
            <span class="logo-text">Trecked</span>
         </router-link>
      </div>

      <div class="block lg:hidden">
         <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <title>Menu</title>
               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
         </button>
      </div>
   
      <div class="main-menu">
         <router-link to="/about">
            About
         </router-link>

         <router-link v-if="!$store.getters.isAuthenticated" to="/login">
            Login
         </router-link>
         <router-link v-if="!$store.getters.isAuthenticated" to="/signup" class="btn-featured">
            Signup
         </router-link>

         <div v-if="$store.getters.isAuthenticated" class="dropdown">
            <router-link :to="profileLink">
               {{ $store.getters.getUserCredentials.handle | capitalize }}
            </router-link>
            <a href="#" @click.prevent="logoutUser">
               Logout
            </a>
         </div>
      </div>
   </nav>
</template>

<script>
export default {
   name: 'Navbar',
   methods: {
      logoutUser() {
         this.$store.dispatch('logOut');
      },
   },
   computed: {
      profileLink() {
         const username = this.$store.getters.getUserCredentials.handle;
         const handle = (username) ? username.toLowerCase() : '';
         return `/user/${handle}`;
      },
   },
}
</script>
