<script setup>
import ProductCard from './ProductCard.vue';
import {getAllProducts} from '../services/fetchData.js'
import { onMounted, ref } from 'vue';
import CollageProducts from './CollageProducts.vue';

const products = ref([]);

onMounted(async () =>{
  try{
    products.value = await getAllProducts();
    
    console.log(products.value);
  }catch(error){
    console.error(error);
  }
});

</script>

<template>
    <div class="container-cards flex flex-col">
      <div
      class="flex flex-col gap-18 items-center bg-linear-to-t from-blue to-indigo-500 h-120 w-full px-5 py-10"
      >
        <div class="text-5xl font-bold flex text-center">
          <h1 class="text-primary">Discover The Best Products <span class="text-semi-white block">For Your Lifestyle</span></h1>
        </div>
        <CollageProducts/>
      </div>

      
      <div
      class="p-3.5 pt-20"
      >
        <ul class="flex flex-wrap gap-5 justify-center">
          <li v-for="product in products" :key="product.id">
            <ProductCard
              :product="product"
            />
          </li>
        </ul>
      </div>
      <div>list categories </div>
    </div>
</template>


<style>
.container-cards{
  width: 100%;
  /* min-width: 600px; */
}
</style>