<script setup>
import { RouterLink } from 'vue-router';
import { useCarStore } from '../stores/car';


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
    <div class="relative flex">
        <div class="absolute">
            <button
            @click="remove(props.product.id)"
            >quiet</button>
        </div>
        <RouterLink
        :to="{name:'productDetails', params: {id: props.product.id}}"
        >
            <div>
                <div>
                    <img :src="props.product.thumbnail" :alt="'An img of ' + props.product.title">
                </div>
                <div>
                    <p>{{ props.product.title }}</p>
                </div>
            </div>
        </RouterLink>

        <div>
            <span>{{ carStore.getPriceOfProduct(props.product.id) }}</span>
            <div class="flex">
                <button 
                class="bg-blue-400"
                @click="carStore.decreaseQuantity(props.product.id)"
                >
                    less
                </button>
                <span>{{ props.quantity }}</span>
                <button 
                @click="carStore.increaseQuantity(props.product.id)"
                class="bg-blue-400"
                >
                    more
                </button>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>