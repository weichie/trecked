<template>
  <div class="home">
    <h1>This is the homepage</h1>
    <div class="bg-red text-white sm:bg-green">
      Welcome {{ $store.state.auth.test }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
