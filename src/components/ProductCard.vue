<script setup >
import { RouterLink } from 'vue-router';
import { useCarStore } from '../stores/car';
import CartIcon from '../assets/CartIcon.vue';
import { computed, ref } from 'vue';
import StarsRating from '../assets/StarsRating.vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const carList = useCarStore();
const isInCart = computed(() => carList.isInCart(props.product.id))


function addProductInCar(product) {
    carList.addProduct(product);
    console.log(carList.carList);
}
</script>

<template>
    <div 
    class="bg-semi-white rounded-3xl card hover:scale-104"
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
                <div class="flex">
                    <StarsRating
                        :rating="props.product.rating"
                    />
                </div> 
                <span class="font-bold text-semi-white price">${{ props.product.price }}</span>
            </section>

        </RouterLink>
        <div class="bg-secundary-blue rounded-b-3xl p-1 flex justify-center">
            <button
            @click="addProductInCar(props.product)"
            class="flex  cursor-pointer hover:bg-blue-400  items-center justify-center  gap-4 z-20 bg-blue font-medium md:px-6 px-2 w-11/12 py-3 rounded-4xl"
            >
                <CartIcon/>
                <span>
                    Add to Cart
                </span>
            </button>
        </div>
    </div>
</template>

<style>
.price{
    font-size: 1.2em;
}
.card{
    width: clamp(328px, 23vw ,350px);
}
</style>