<template>
   <div class="max-w-sm w-full lg:max-w-full lg:flex mb-5">
      <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('https://images.pexels.com/photos/2700087/pexels-photo-2700087.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=150&w=500')" title="Woman holding a mug"></div>
      <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal flex-1">
         <div class="mb-8">
            <p class="text-sm text-gray-600 flex items-center" v-if="place.locationId">
               <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" /></svg>
               {{ place.locationId }}
            </p>
            <div class="text-gray-900 font-bold text-xl mb-2">
               <router-link :to="`/users/${place.userHandle}`">
                  {{ place.body }}
               </router-link>
            </div>
            <p class="text-gray-700 text-base">{{ place.body }}</p>
         </div>
         <div class="flex items-center">
            <img class="w-10 h-10 rounded-full mr-4" :src="place.userImage" :alt="place.userHandle">
            <div class="text-sm">
               <p class="text-gray-900 leading-none">{{ place.userHandle }}</p>
               <p class="text-gray-600">
                  {{ place.createdAt | fromNow }} | 
                  <a v-if="!likedPlace" href="#!" @click.prevent="likePlace(place.locationId)">
                     like
                  </a>
                  <a v-else href="#!" @click.prevent="unlikePlace(place.locationId)">
                     unlike
                  </a>
               </p>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: 'place',
   props: {
      place: {
         type: Object,
         required: true
      },
   },
   methods: {
      likePlace(placeId){
         if(this.$store.getters.isAuthenticated){
            this.$store.dispatch('likePlace', placeId);
         }
      },
      unlikePlace(placeId){
         if(this.$store.getters.isAuthenticated){
            this.$store.dispatch('unlikePlace', placeId);
         }
      },
   },
   computed: {
      likedPlace() {
         const userLikes = this.$store.getters.getUserLikes;
         if(userLikes && userLikes.find(like => like.placeId === this.place.locationId)){
            return true;
         }else{
            return false;
         }
      },
   },
}
</script>
