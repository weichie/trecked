<template>
   <div class="user-profile__side py-4">
      <div class="content" v-if="!loading">
         <div v-if="authenticated" class="profile">
            <div class="profile__header">
               <img :src="user.imageUrl" :alt="`${user.handle} avatar`">
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

