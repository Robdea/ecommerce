<script setup>
import { useCarStore } from '../stores/car'
import MiniCardOfProduct from './MiniCardOfProduct.vue'

const props = defineProps({
    modalCart: HTMLDivElement,
    cartListModal: Boolean,
    handleShow: Function
})

const carList = useCarStore();

</script>

<template>

    <div 
    ref="modalCart"
    @click="handleShow"
    v-if="props.cartListModal"
    class="absolute z-100 modal-cart"
        >
        <div class="w-full relative flex justify-end h-full">
            <div 
            @click.stop
            class="bg-primary border-l-3 border-light-gray w-120 z-100 p-5">
                <h1 class="text-2xl font-medium text-semi-white mb-3">My cart</h1>
                <ul 
                class="h-3/4 overflow-y-auto flex flex-col gap-2"
                v-if="carList.carList.length > 0"
                    >
                    <li 
                    v-for="product in carList.carList" :key="product.id">
                        <MiniCardOfProduct
                            :product="product.product"
                            :quantity="product.quantity"
                        />
                    </li>
                </ul>

            <div 
                class="h-3/4 text-semi-white flex flex-col items-center gap-4 text-2xl pt-20"
                v-else>
                    <svg  
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24"  height="24"  
                    viewBox="0 0 24 24"  
                    fill="none"  
                    stroke="currentColor"  
                    stroke-width="2"  
                    stroke-linecap="round"  
                    stroke-linejoin="round"  
                    class="size-15">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M15 17h-9v-14h-2" /><path d="M6 5l14 1l-.854 5.976m-2.646 1.024h-10.5" /><path d="M19 16v3" /><path d="M19 22v.01" /></svg>
                    <h2 class="font-medium">There are no products yet</h2>
                </div>
                <div class="text-semi-white">
                    <span>Total: {{ carList.cartTotal }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>