<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoryList, getProductsByName, productsByCategory } from '../services/fetchData';
import ProductCard from './ProductCard.vue';
import { useWindowSize } from '../composables/isMoviel';

const route = useRoute();
const categoryParam = ref(route.params.category || '');
const searchQuery = ref(route.query.q || '');
const listProducts = ref([]);
const listCategories = ref([]);

async function fetchProducts() {
    try {
        if (searchQuery.value) {
            const res = await getProductsByName({ title: searchQuery.value });
            listProducts.value = res;
        } else if (categoryParam.value) {
            const res = await productsByCategory({ category: categoryParam.value });
            listProducts.value = res;
        } else {
            listProducts.value = []; 
        }
    } catch (e) {
        console.error(e);
    }
}


async function getCategories() {
    try{
        const res = await getCategoryList();
        listCategories.value = res;
    }catch(e){
        console.error(e);
    }
}

onMounted(() =>{
    getCategories();
    fetchProducts();
});

watch(
    () => [route.query.q, route.params.category],
    ([newQuery, newCategory]) =>{
        searchQuery.value = newQuery || '';
        categoryParam.value = newCategory || '';
        fetchProducts()
    } 
);

const showCategories = ref(false);

const {isMobile} = useWindowSize(730);

</script>

<template>
   <div class="flex md:flex-row flex-col">
        <div class=" md:w-48 w-full md:h-screen h-30 sticky z-40 md:top-14 top-14  p-4 text-semi-white backdrop-brightness-50">
            <nav>
                <h2 class="mb-2 font-bold">Collections</h2>
                <template v-if="!isMobile">
                    <ul v-if="listCategories.length > 0">
                        <li 
                        v-for="category in listCategories" :key="category.id" 
                        :class="category === categoryParam ? 'underline' : ''"
                        class="mb-1 category">
                            <router-link
                                :to="{ name: 'search', params:{ category: category } }"
                                class="hover:underline"
                            >
                                {{ category }}
                            </router-link>
                        </li>
                    </ul>
                </template>

                <template v-else>
                    <div >
                        <div 
                        @click="showCategories = !showCategories"
                        class="rounded-xl border-2 border-light-blue h-10 items-center flex">
                            <div>
                                <p class="p-2">{{ categoryParam ? categoryParam : 'Select category' }}</p>
                                <div 
                                v-if="showCategories"
                                @click.stop
                                class="absolute bg-light-gray h-45 overflow-auto w-11/12 rounded-xl list-none p-3 top-25 z-90 ">
                                    <li 
                                    class="p-1.5" v-for="category in listCategories" 
                                    :class="category === categoryParam ? 'underline' : ''"
                                    :key="category.id">
                                        <router-link
                                            :to="{ name: 'search', params:{ category: category } }"
                                            class="hover:underline w-full block"
                                        >
                                            <span>{{ category }}</span>
                                        </router-link>
                                    </li>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </nav>
        </div>

       <div class="py-10 flex-1 px-10">
           <div v-if="listProducts.length > 0" >
                <ul class="flex flex-wrap gap-5 md:justify-start justify-center ">
                    <li v-for="product in listProducts" :key="product.id">
                       <ProductCard
                           :product="product"
                       />
                   </li>
               </ul>
           </div>
             <div 
             class="flex flex-col items-center w-full py-8 text-amber-50 h-full text-2xl"
             v-else>
                <svg  
                    xmlns="http://www.w3.org/2000/svg"  
                    width="24"  
                    height="24"  
                    viewBox="0 0 24 24"  
                    fill="none"  
                    stroke="currentColor"  
                    stroke-width="2"  
                    stroke-linecap="round"  
                    stroke-linejoin="round"  
                    class="size-30">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                </svg>
                <h2 class="font-medium">No products found</h2>
            </div>
       </div>
   </div>
</template>

<style >
    .category{
        font-size: 13.5px;
    }
</style>