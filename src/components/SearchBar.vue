<script setup>
import { useWindowSize } from '../composables/isMoviel';

const props = defineProps({
    submitSearch: Function,
});

const {isMobile} = useWindowSize(630);

</script>


<template>
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
        <template v-else>
            <dialog ref="modalRef">
                <div>
                    <input 
                        v-model="searchQuery"
                        placeholder="Search products..."
                        type="text"
                        class="text-semi-white border-2 border-light-gray py-1.5 px-3.5 rounded-xl w-3/4 outline-2 focus:outline-blue"
                        />             
                    <ResultSearch
                        :list-products="listProducts"
                        :handle-search="handleSearch"
                    />                       
                    <button>ss</button>        
                </div>
            </dialog>
        </template>

            <div 
            v-if="listProducts.length > 0"
            class="absolute 
            w-1/2
            md:right-60
            right-30
            rounded-b-2xl
            top-16 z-50 p-3.5 text-semi-white bg-primary"
            >
            <ResultSearch
                :list-products="listProducts"
                :handle-search="handleSearch"
            />
            </div>
            <button 
            class="hover:bg-light-blue px-2 rounded-xl text-semi-white p-1"
            @click="handleShowResultList"
            :type="isMobile ? 'button' : 'submit'">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>   
    </form>
</template>

<style lang="scss" scoped>

</style>