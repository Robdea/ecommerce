<script setup>
import ProductCard from './ProductCard.vue';
import {getAllProducts} from '../services/fetchData.js'
import { onMounted, ref } from 'vue';

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
    <div class="container-cards">
      <div>
        <ul class="flex flex-wrap gap-3 justify-center">
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
  min-width: 600px;
}
</style>