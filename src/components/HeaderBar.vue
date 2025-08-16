<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNameOfProducts } from '../services/fetchData';
import { useCarStore } from '../stores/car';
import CartIcon from '../assets/CartIcon.vue';
import { useWindowSize } from '../composables/isMoviel';
import ResultSearch from './ResultSearch.vue';
import ModalCart from './ModalCart.vue';

const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.query.q || '');
const listProducts = ref([]);
const {isMobile} = useWindowSize(630);

function submitSearch() {
    if(searchQuery.value.trim().length >= 3){
        router.push({
            name: 'search',
            query: {q: searchQuery.value}
        })
        if(isMobile) modalRef.value.close()
        searchQuery.value = '';
    }
}

watch(searchQuery, async (newValue) =>{
    if(newValue.trim().length >= 3){
        try {
            listProducts.value = await getNameOfProducts({title: newValue});
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


function hanldeShowCar() {
    cartListModal.value = !cartListModal.value
    hiddenScroll()
}

const showResultList = ref(false)

const modalRef = ref(null)

const handleShowResultList = ()=>{
    showResultList.value = true;
    hiddenScroll()
    modalRef.value.showModal()
}
const carList = useCarStore();

function handleCloseModal() {
    modalRef.value.close()
}


function closeModalCart() {
    if(cartListModal) cartListModal.value = false
}

function handleCloseModalCart() {
 cartListModal.value = false; 
 hiddenScroll()
}

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
                     @click="closeModalCart"
                     class="flex flex-row gap-2 sm:w-3/4  w-1/4"
                     @submit.prevent="submitSearch">    
                        <template v-if="!isMobile">
                            <input 
                                v-model="searchQuery"
                                placeholder="Search products..."
                                type="text"
                                class="text-semi-white border-2 border-light-gray py-1.5 px-3.5 rounded-xl w-3/4 outline-2 focus:outline-blue"
                            />
                                <div 
                                    v-if="listProducts.length > 0"
                                    class="absolute w-1/2 md:right-60 right-30 rounded-b-2xl top-16 z-50 p-3.5 text-semi-white bg-primary"
                                        >
                                    <ResultSearch
                                        :list-products="listProducts"
                                        :handle-search="handleSearch"
                                    />
                                </div>
                        </template>
                        <template v-else>
                            <dialog 
                            class="h-full w-full modal-show-results" 
                            ref="modalRef">
                                <div 
                                @click="handleCloseModal"
                                class="h-full w-full py-20 flex justify-center">
                                    <div @click.stop class="h-fit">
                                        <div class="flex items-center gap-1.5 bg-light-gray py-4 rounded-3xl px-3.5 mb-1">
                                            <input 
                                                v-model="searchQuery"
                                                placeholder="Search products..."
                                                type="text"
                                                class="text-semi-white border-2 border-light-gray py-1.5 px-3.5 rounded-xl w-3/4 min-w-50 outline-2 focus:outline-blue"
                                            />     
                                            <button 
                                            class="hover:bg-light-blue px-2 rounded-xl text-semi-white p-1"
                                            type='submit'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                                </svg>
                                            </button>   
                                        </div>
                                        <ResultSearch
                                            v-if="listProducts.length > 0"
                                            class="text-semi-white bg-light-gray p-2 rounded-3xl h-80 overflow-auto"
                                            :list-products="listProducts"
                                            :handle-search="handleSearch"
                                        />                       
                                    </div>
                                </div>
                            </dialog>
                        </template>    
                        <button 
                         class="hover:bg-light-blue px-2 rounded-xl text-semi-white p-1"
                        v-on="isMobile ? { click: handleShowResultList } : {}"
                         :type="isMobile ? 'button' : 'submit'">
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

            <ModalCart 
            :cart-list-modal="cartListModal"
            :modal-cart="modalCart"
            :handle-show="handleCloseModalCart"
            />
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
.modal-show-results::backdrop{
  background-color: rgba(0, 0, 0, 0.5); /* overlay */
}
.modal-show-results{
  background-color: rgba(0, 0, 0, 0); /* overlay */
}
</style>

