<script setup>
import { onMounted, ref } from 'vue';
import { getProductsRandom } from '../services/fetchData';
import { RouterLink } from 'vue-router';


const products = ref([])

onMounted(async () =>{
    try {
        products.value = await getProductsRandom();
        console.log(products.value);  
        console.log(products.value[0].images[0]);   
    } catch (error) {
        console.error(error);
    }
});

const positionClasses = [
  'translate-x-[-90px] translate-y-[-40px] rotate-[-5deg]',
  'translate-x-[80px] translate-y-[-60px] rotate-[3deg]',   
  'translate-x-[-40px] translate-y-[60px] rotate-[2deg]'    
];

</script>

<template>
  <div class="relative mt-2 flex justify-center  items-center w-full h-[400px]">
    <div 
      v-for="(product, index) in products.slice(0, 3)" 
      :key="product.id"
      class="absolute bg-white rounded-3xl shadow-gray-500 shadow-md p-2 hover:scale-110 hover:z-30 "
      :class="positionClasses[index]"
    >
        <RouterLink
        :to="{name:'productDetails', params: {id: product.id}}"
        >
            <img 
              loading="lazy"
              class="rounded-lg card-product object-cover"
              :src="product.images[0]" 
              :alt="'Image of ' + product.title"
            >
        </RouterLink>
    </div>
  </div>
</template>

<style >
.card-product{
  height: clamp(110px, 20vh,210px);
  width: clamp(130px, 20vw,210px);
}

</style>