<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoryList, getProductsByName, productsByCategory } from '../services/fetchData';
import ProductCard from './ProductCard.vue';

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
            console.log(listProducts.value);
        } else {
            listProducts.value = []; // Sin búsqueda ni categoría
        }
    } catch (e) {
        console.error(e);
    }
}

async function getCategories() {
    try{
        const res = await getCategoryList();
        listCategories.value = res;
        console.log("Categories fetched:", listCategories.value);
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

</script>

<template>
   <div class="flex flex-row">
        <div class="bg-amber-300 w-400 py-10 px-2 sticky">
            <div class=" fixed">
                <nav>
                    <h2 class="">Collections</h2>
                    <ul v-if="listCategories.length > 0">
                        <li v-for="category in listCategories" :key="category.id">
                             <router-link
                                 :to="{name: 'search', params:{category: category}}"
                             >
                                 <span>{{ category }}</span>
                             </router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

       <div class="py-10">
           <div v-if="listProducts.length > 0" >
               <ul class="flex flex-wrap gap-5 justify-center">
                   <li v-for="product in listProducts" :key="product.id">
                       <ProductCard
                           :product="product"
                       />
                   </li>
               </ul>
           </div>
             <div v-else>
                <h1 class="bg-semi-white">saassad</h1>
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
                    class="icon icon-tabler icons-tabler-outline icon-tabler-alert-small">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                </svg>
            </div>
       </div>

   </div>
</template>

<style lang="scss" scoped>
</style>