<template>
   <div class="user-profile__side py-4">
      <div class="content" v-if="!loading">
         <div v-if="authenticated" class="profile">
            <div class="profile__header">
               <div class="avatar">
                  <img :src="user.imageUrl" :alt="`${user.handle} avatar`" @click="handleEditAvatar">
                  <input type="file" hidden="hidden" id="imageInput" @change="handleImageChange($event)" />
               </div>
               
               <div class="wrapper">
                  <h4>Welcome {{ user.handle | capitalize }}</h4>
                  <router-link :to="`/user/${user.handle}`">
                     <small>View profile</small>
                  </router-link>
               </div><!-- ./wrapper -->
            </div><!-- ./profile__header -->

            <div class="profile__bio py-4">
               <p v-show="user.bio">{{ user.bio }}</p>
               <p v-show="user.website">
                  <a :href="user.website" target="_blank" rel="noopener noreferrer">
                     {{ user.website }}
                  </a>
               </p>
               <p v-show="user.location">{{ user.location }}</p>
               <p>Member since <span>{{ joinedSince }}</span></p>
            </div>
         </div><!-- ./profile -->

         <div v-else class="profile">
            Please <router-link to="/login">login</router-link> to view your profile.
         </div><!-- ./profile -->
      </div><!-- ./content -->

      <p v-else>Loading profile...</p>
   </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
   name: 'userProfile',
   methods: {
      handleImageChange(event){
         const data = new FormData();
         const file = event.target.files[0];
         data.append('image', file, file.name);
         this.$store.dispatch('uploadImage', data);
      },
      handleEditAvatar(){
         const fileInput = document.getElementById('imageInput');
         fileInput.click();
      },
   },
   computed: {
      user() {
         return this.$store.getters.getUserCredentials;
      },
      authenticated() {
         return this.$store.getters.isAuthenticated;
      },
      loading() {
         return this.$store.getters.isLoading;
      },
      joinedSince() {
         return dayjs(this.user.createdAt).format('MMM DD, YYYY');
      },
   },
};
</script>

