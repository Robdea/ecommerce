<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNameOfProducts } from '../services/fetchData';
import { useCarStore } from '../stores/car';
import MiniCardOfProduct from './MiniCardOfProduct.vue';
import CartIcon from '../assets/CartIcon.vue';

const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.query.q || '');
const listProducts = ref([]);

function submitSearch() {
    if(searchQuery.value.trim().length >= 3){
        router.push({
            name: 'search',
            query: {q: searchQuery.value}
        })
        searchQuery.value = '';
    }
}

watch(searchQuery, async (newValue) =>{
    if(newValue.trim().length >= 3){
        try {
            listProducts.value = await getNameOfProducts({title: newValue});
            console.log(listProducts.value);
        } catch (error) {
            console.error(error.message);
        }
    }else{
        listProducts.value = []
    }
});

function handleSearch() {
    searchQuery.value = ''
}

const showCarList = ref(false)

function hanldeShowCar() {
    showCarList.value = !showCarList.value
}

const carList = useCarStore();


</script>

<template>
   <header class="flex flex-row bg-primary py-3 px-23 relative justify-between items-center">
        <RouterLink to="/">
            <h1 class="text-blue font-bold text-2xl">
                FakeEcommerce
            </h1>
        </RouterLink>

        <div class="flex flex-row gap-3 items-center justify-end w-3/5">
            <form 
            class="flex flex-row gap-2 w-3/4"
            @submit.prevent="submitSearch">    
                <input 
                v-model="searchQuery"
                placeholder="Search products..."
                type="text"
                class="text-text border-2 border-light-gray py-1.5 px-3.5 rounded-xl w-3/4 outline-2 focus:outline-blue"
                />
                <div 
                v-if="listProducts"
                class="absolute 
                w-1/2
                right-60
                rounded-b-2xl
                top-16 z-50 p-3.5 text-semi-white bg-primary"
                >
                    <ul>
                        <li 
                        v-for="product in listProducts" :key="product.id">
                            <RouterLink
                            class="w-full flex gap-2 hover:bg-blue p-1.5" 
                            :to="{name: 'search', query: {q: product.title}}"
                            @click="handleSearch"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <span
                                >
                                    {{ product.title }}
                                </span>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
                <button 
                class="hover:bg-blue px-4 rounded-xl text-semi-white"
                type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>    
            </form>

            <div class="relative">
                <div class="relative">
                    
                    <div v-if="carList.carList.length > 0" class="number-products absolute text-semi-white rounded-full p-1 px-2 -left-2 -top-1 bg-red-600">
                        {{ carList.totalProducts }}
                    </div>

                    <button 
                    :onclick="hanldeShowCar"
                    class="p-2.5 rounded-xl text-semi-white">
                        <CartIcon/>
                    </button>
                </div>

                <div v-if="showCarList" class="w-2xl absolute top-15 right-1 z-50">
                    <div class="bg-amber-500 car">
                        <ul 
                        class="h-10/12 overflow-y-scroll"
                        v-if="carList.carList.length > 0"
                            >
                            <li v-for="product in carList.carList" :key="product.id">
                                <MiniCardOfProduct
                                    :product="product.product"
                                    :quantity="product.quantity"
                                />
                            </li>
                        </ul>

                        <div v-else>
                            <h1>Aun no hay productos xd</h1>
                        </div>
                        <div>
                            <span>Total: {{ carList.cartTotal }}</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
  </header>
</template>

<style >
.car{
    height: 40em;
}
.number-products{
    font-size: 11px;
}
</style>

