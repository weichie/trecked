<template>
   <p class="text-center text-gray-500 text-xs">
      &copy; {{year}} Weichie. All rights reserved.
   </p>
</template>

<script>
export default {
   name: 'Copyright',
   computed: {
      year() {
         return new Date().getFullYear();
      }
   },
};
</script>
