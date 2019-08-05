<template>
   <nav class="main-navbar flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
         <router-link to="/">
            <!-- SVG ICON HERE -->
            <span class="font-semibold text-xl tracking-tight">Trecked</span>
         </router-link>
      </div>

      <div class="block lg:hidden">
         <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <title>Menu</title>
               <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
         </button>
      </div>
   
      <div class="w-auto flex-grow flex items-center">
         <div class="text-right flex-grow">
            <router-link to="/about" class="inline-block text-teal-200 hover:text-white mr-4">
               About
            </router-link>
            <router-link v-if="!$store.getters.isAuthenticated" to="/login" class="inline-block text-teal-200 hover:text-white">
               Login
            </router-link>
            <router-link v-if="!$store.getters.isAuthenticated" to="/signup" class="inline-block text-sm px-4 py-2 ml-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
               Signup
            </router-link>

            <router-link v-if="$store.getters.isAuthenticated" to="/login" class="inline-block text-teal-200 hover:text-white mr-4">
               Profile
            </router-link>
         </div>
      </div>
   </nav>
</template>

<script>
export default {
   name: 'Navbar',
}
</script>
