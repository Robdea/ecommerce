<script setup>
import {  ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { productById, productsByCategory } from '../services/fetchData';
import StarsRating from '../assets/StarsRating.vue';
import CartIcon from '../assets/CartIcon.vue';
import { useCarStore } from '../stores/car';
import HorizontalScroll from './HorizontalScroll.vue'

const route = useRoute();

const productData = ref(null);
const productsRelation = ref([]);


const loadProduct = async (id) =>{
    try {
        productData.value = await productById({id});
    } catch (error) {
        console.error(error.message);
    }
}

const loadRelationProducts = async (category) =>{
    try {
        productsRelation.value = await productsByCategory({category})  
    } catch (error) {
        console.error(error);
    }
}
const cartStore = useCarStore()

watch(
  () => route.params.id,
  async (newId) => {
    await loadProduct(newId); 
    window.scrollTo({top:0, behavior: "smooth"})
    if (productData.value?.category) {
      await loadRelationProducts(productData.value.category); 
      console.log(productsRelation.value); 
    }
  },
  { immediate: true }
);

</script>

<template>
    <div v-if="productData" class="text-white flex flex-col py-18 gap-3.5 px-4 ">
        <div class="flex md:flex-row flex-col gap-13 mb-2 justify-center">
            <section class="flex bg-semi-white rounded-2xl p-2 justify-center">
                <img  
                class="product-image h-full object-cover"
                :src="productData.thumbnail" :alt="'Image of ' + productData.title">
            </section>
            <section class="md:w-1/2 w-full">
                <h1 class="text-3xl font-bold mb-2">{{ productData.title }}</h1>
                <StarsRating
                    class="mb-2"
                    :rating="productData.rating"
                />

                <div class="mt-4 mb-6">
                    <span class="text-blue font-bold text-3xl ">${{ productData.price }}</span>
                    <p class="mt-2.5">{{ productData.description }}</p>
                </div>

                <button 
                @click="cartStore.addProduct(productData)"
                class="bg-blue px-6 py-2 rounded-xl cursor-pointer hover:bg-blue-400 text-light-gray font-medium md:w-1/2 w-3/4 mb-6 flex justify-center gap-5">
                    <CartIcon/>
                    <span>
                        Add to cart
                    </span> 
                </button>
                <div class="bg-dark-blue p-3 border-2 border-light-gray rounded-xl">
                    <h2 class="text-2xl font-medium">Dimensions</h2>
                    <ul class="mt-3 flex flex-col gap-3 list-disc pl-6">
                        <li>
                            <span>Width: {{ productData.dimensions.width }}</span>
                        </li>
                        <li>
                            <span>Height: {{ productData.dimensions.height }}</span>
                        </li>
                        <li>
                            <span>Depth {{ productData.dimensions.depth }}</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>

        <div class="px-9">
            <h2 class="text-3xl font-bold mt-5">Reviews</h2>
            <div class="bg-dark-blue p-3 border-2 border-light-gray rounded-xl">
                <ul class="flex flex-col gap-4">
                    <li v-for="review in productData.reviews" :key="review.id">
                        <div class="flex flex-col">
                            <div class="flex gap-4 ">
                                <span class="font-medium">{{ review.reviewerName }}</span>
                                <StarsRating
                                    :rating="review.rating"
                                />
                            </div>
                            <p class="review-comment text-text">{{ review.comment }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <h2 class="text-3xl font-bold mt-5 ml-11">Related Products</h2>
        <div class="flex justify-center">
            <HorizontalScroll
            :productsData="productsRelation" 
            />
        </div>
    </div>
</template>


<style >
.review-comment{
    font-size: 0.9em;
}

.product-image{
    width: clamp(360px, 32vw, 440px);
}

</style>