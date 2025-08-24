<script setup>
import { ref } from 'vue';
import ProductCard from './ProductCard.vue'
import { useWindowSize } from '../composables/isMoviel';

const props = defineProps({
  productsData: Array
})

const scrollContainer = ref(null);

const {isMobile} = useWindowSize(730);


function scrollLeft() {
  scrollContainer.value.scrollBy({ left: -1050, behavior: 'smooth' });
}

function scrollRight() {
  scrollContainer.value.scrollBy({ left: 1050, behavior: 'smooth' });
}
</script>


<template>
  <div 
  :class="isMobile ? 'w-full' : 'w-11/12 p-2'"
  class=" relative">
    <button v-if="!isMobile" class="absolute -left-9 top-1/2 bg-blue rounded-xl p-2" @click="scrollLeft">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
      </svg>
    </button>

    <div ref="scrollContainer" class="flex gap-4 overflow-x-auto whitespace-nowrap px-2 py-6">
      <div v-for="product in props.productsData">
        <ProductCard
          :different-class="true"
          :product="product"
        />
      </div>
    </div>
    
    <button v-if="!isMobile" class="absolute top-1/2 -right-9 bg-blue rounded-xl p-2" @click="scrollRight">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>

<style>
</style>
