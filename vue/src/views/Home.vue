<template>
  <div class="home container mx-auto">
    <div class="flex mb-4 border">
      <div class="w-4/6 px-4 border">
        <div v-if="places">
          <Place 
            v-for="(place, i) in places" 
            :key="`place-${i}`"
            :place="place" 
          />
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
      <div class="w-2/6 px-4 border">
        <Profile />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Place from '@/components/Place'
import Profile from '@/components/Profile'

export default {
  name: 'home',
  components: {
    Place,
    Profile,
  },
  data(){
    return{
      places: null
    }
  },
  mounted(){
    axios.get('https://europe-west1-trecked-6b2cd.cloudfunctions.net/api/places')
      .then(res => {
        this.places = res.data
      })
      .catch(err => {
        console.error(err);
      });
  },
  metaInfo: {
    title: 'Trecked | Your personal travel guide, created by your friends!'
  }
}
</script>
