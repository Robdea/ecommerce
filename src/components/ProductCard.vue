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
    class="bg-secundary-bg rounded-3xl card"
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
            <section class="flex flex-col p-5 bg-secundary-blue">
                <span class="text-semi-white font-medium">{{ props.product.title }}</span>
                <span class="font-bold text-semi-white price">{{ props.product.price }}</span>
            </section>

        </RouterLink>
        <div class="bg-secundary-blue rounded-b-3xl">
            <button
            @click="addProductInCar(props.product)"
            class="z-20 bg-neutral-500 px-6"
            >
                add car
            </button>
        </div>
    </div>
</template>

<style>
.price{
    font-size: 1.2em;
}

.card{
    width: clamp(280px, 23vw ,330px);
}
</style>