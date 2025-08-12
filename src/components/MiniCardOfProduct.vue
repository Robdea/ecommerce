<script setup>
import { RouterLink } from 'vue-router';
import { useCarStore } from '../stores/car';
import MinusMoreBttn from './MinusMoreBttn.vue';


const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    quantity: Number
});

const carStore = useCarStore();

function remove(id) {
    carStore.removeProduct(id)    
}

</script>


<template>
    <div class="relative flex gap-3 border-b-3 border-light-gray w-full justify-between px-2">
        <div class="absolute">
            <button
            @click="remove(props.product.id)"
            class="bg-gray-400 text-semi-white rounded-full p-1 "
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <RouterLink
        class="w-30"
        :to="{name:'productDetails', params: {id: props.product.id}}"
        >
            <div class="flex items-center">
                <div class="bg-semi-white rounded-xl flex items-center border-1 border-light-gray">
                    <img 
                    class="object-cover size-20"
                    :src="props.product.thumbnail" :alt="'An img of ' + props.product.title">
                </div>
                <div class="pl-3 w-10 text-semi-white">
                    <p>{{ props.product.title }}</p>
                </div>
            </div>
        </RouterLink>

        <div class="flex flex-col">
            <span class="self-end mb-1 text-semi-white">${{ carStore.getPriceOfProduct(props.product.id) }}</span>
            <MinusMoreBttn
                v-if="props.product"
                :quantity="props.quantity"
                @increase="carStore.increaseQuantity(props.product.id)"
                @decrease="carStore.decreaseQuantity(props.product.id)"
            />
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>