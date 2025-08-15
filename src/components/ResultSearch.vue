<script setup>
import { RouterLink } from 'vue-router';


const props = defineProps({
    listProducts: Array,
    handleSearch: Function
});


</script>

<template>
    <ul>
        <li 
        v-for="product in props.listProducts" :key="product.id">
            <RouterLink
            class="w-full flex gap-2 hover:bg-blue p-1.5" 
            :to="{name: 'search', query: {q: product.title}}"
            @click="props.handleSearch"
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
</template>


<style lang="scss" scoped>

</style>