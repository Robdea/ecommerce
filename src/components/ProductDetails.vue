<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { productById } from '../services/fetchData';


const route = useRoute();

const productData = ref(null);


const loadProduct = async (id) =>{
    try {
        productData.value = await productById({id});
        console.log(productData.value);
    } catch (error) {
        console.error(error.message);
    }
}

onMounted(() =>{
    loadProduct(route.params.id)
});

</script>

<template>
    <div v-if="productData">
        <div>
            <section>
                <img :src="productData.thumbnail" alt="">
            </section>
            <section>
                <h1>{{ productData.title }}</h1>
                <span>{{ productData.price }}</span>
                <div>
                    <ul>
                        <li>
                            <span> {{ productData.dimensions.width }}</span>
                        </li>
                        <li>
                            <span> {{ productData.dimensions.height }}</span>
                        </li>
                        <li>
                            <span> {{ productData.dimensions.depth }}</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3>About this product</h3>
                    <p>{{ productData.description }}</p>
                </div>
            </section>
        </div>
        <div>
            <h2>Reviews</h2>
            <ul>
                <li v-for="review in productData.reviews" :key="review.id">
                    <div>
                        <span>{{ review.rating }}</span>
                        <span>{{ review.comment }}</span>
                        <span>{{ review.reviewerName }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>