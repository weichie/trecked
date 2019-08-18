<template>
   <div class="home container mx-auto">
      <h1 class="text-gray-900 font-bold text-xl mb-2">{{ this.$store.getters.getUserCredentials.handle }} profile</h1>
      
      <form @submit.prevent="handleSubmit()">
         <textarea type="text" class="border" v-model="bio"></textarea><br>
         <input type="text" class="border" v-model="website" /><br>
         <input type="text" class="border" v-model="location" /><br>
         <button type="submit">Save changes</button>
      </form>
   </div>
</template>

<script>
export default {
   name: 'EditDetails',
   data() {
      return {
         bio: this.$store.getters.getUserCredentials.bio,
         website: this.$store.getters.getUserCredentials.website,
         location: this.$store.getters.getUserCredentials.location,
      }
   },
   mounted(){
      this.handleSubmit();
   },
   methods: {
      handleSubmit(){
         const userData = {
            bio: this.bio,
            website: this.website,
            location: this.location
         };

         this.$store.dispatch('updateUserDetails', userData);
      },
   },
}
</script>