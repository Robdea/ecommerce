<script setup>
import { RouterView} from 'vue-router';
import HeaderBar from './HeaderBar.vue';

</script>

<template>
    <HeaderBar/>

  <main>
    <RouterView/>
  </main>
  <footer>
    info
  </footer>
</template>

<style  scoped>

</style>