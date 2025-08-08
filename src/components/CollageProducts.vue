<script setup>
import { onMounted, ref } from 'vue';
import { getProductsRandom } from '../services/fetchData';


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
  'top-1 z-20',
  'left-36',
  'top-1/2 left-2'
];

</script>

<template>
    <section>
        
        <div class="relative w-1/4">
            <div 
            v-for="(product, index) in products.slice(0, 3)" 
            :key="product.id" 
            :class="'absolute', positionClasses[index]"
            >
                <img 
                    loading="lazy"
                    class="rounded-lg w-2xs "
                    :src="product.images[0]" :alt="'Image of ' + product.title"
                >
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

</style>