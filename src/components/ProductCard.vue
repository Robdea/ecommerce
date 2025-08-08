<script setup >
import { RouterLink } from 'vue-router';
import { useCarStore } from '../stores/car';


const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const carList = useCarStore();

function addProductInCar(product) {
    carList.addProduct(product);
    console.log(carList.carList);
}

</script>

<template>
    <div 
    class="bg-amber-200 rounded-3xl"
    >
    
        <RouterLink 
        class="z-0"
        :to="{name:'productDetails', params: {id: props.product.id}}">
            <div class="flex justify-center relative">
                <img 
                class="size-2/4"
                loading="lazy"
                :src="props.product.thumbnail" :alt="'Picture of ' + props.product.title">
            </div>
            <section class="flex flex-col p-5 bg-amber-900 rounded-b-3xl">
                <span>{{ props.product.title }}</span>
                <span>{{ props.product.price }}</span>
            </section>

        </RouterLink>
        <button
        @click="addProductInCar(props.product)"
        class="z-20 bg-neutral-500 px-6"
        >
            add car
        </button>
    </div>
</template>

<style scoped>
</style>