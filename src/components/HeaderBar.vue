<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNameOfProducts } from '../services/fetchData';
import { useCarStore } from '../stores/car';
import MiniCardOfProduct from './MiniCardOfProduct.vue';
import CartIcon from '../assets/CartIcon.vue';
import { useWindowSize } from '../composables/isMoviel';

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

const modalCart = ref(null)
const cartListModal = ref(false)

function hiddenScroll() {
    if(cartListModal.value === true){
        document.body.style.overflow = "hidden"
    }else{
        document.body.style.overflow = "auto"
    }
}

const {isMobile, windowWidth} = useWindowSize(630);

function hanldeShowCar() {
    cartListModal.value = !cartListModal.value
    hiddenScroll()
}

const carList = useCarStore();

</script>

<template>
    <div class="bg-primary w-full h-15">
        <div class="fixed z-90 top-0 w-full">
            <header 
            
            class="h-15 backdrop-brightness-20 flex flex-row py-2 md:px-23 px-5 relative justify-between items-center">
                 <RouterLink to="/">
                     <h1 class="text-blue font-bold text-2xl">
                         FakeEcommerce
                     </h1>
                 </RouterLink>
         
                <div class="flex flex-row gap-3 items-center justify-end w-3/5">
                     <form 
                     class="flex flex-row gap-2 sm:w-3/4  w-1/4"
                     @submit.prevent="submitSearch">    
                        
                        <template v-if="!isMobile">
                            <input 
                             v-model="searchQuery"
                             placeholder="Search products..."
                             type="text"
                             class="text-semi-white border-2 border-light-gray py-1.5 px-3.5 rounded-xl w-3/4 outline-2 focus:outline-blue"
                             />
                        </template>

                         <div 
                         v-if="listProducts.length > 0"
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
                         class="hover:bg-light-blue px-2 rounded-xl text-semi-white p-1"
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
                                class="p-2.5 rounded-xl text-semi-white hover:bg-light-blue">
                                    <CartIcon/>
                                </button>
                            </div>
                    </div>
                 </div>
           </header>
   
           <div 
            ref="modalCart"
            @click="cartListModal = false; hiddenScroll()"
            v-if="cartListModal"
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
    
                            <div v-else>
                                <h1>Aun no hay productos xd</h1>
                            </div>
                            <div class="text-semi-white">
                                <span>Total: {{ carList.cartTotal }}</span>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<style >
.number-products{
    font-size: 11px;
}
.modal-cart{
    left: 0;
    width: 100%;
    height: calc(100vh - 60px); /* Solo viewport disponible */
    background-color: rgba(0, 0, 0, 0.515);
}
</style>

