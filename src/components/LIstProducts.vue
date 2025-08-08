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
       <div>
           <nav>
               <h2>Collections</h2>
               <ul v-if="listCategories">
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
       <div v-if="listProducts.length > 0">
           <ul>
               <li v-for="product in listProducts" :key="product.id">
                   <ProductCard
                       :product="product"
                   />
               </li>
           </ul>
       </div>
   </div>
</template>

<style lang="scss" scoped>
</style>