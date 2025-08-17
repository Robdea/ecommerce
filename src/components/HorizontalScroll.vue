<script setup>
import { ref } from "vue";

const scrollContainer = ref(null);

function scrollLeft() {
  scrollContainer.value.scrollBy({ left: -200, behavior: "smooth" });
}

function scrollRight() {
  scrollContainer.value.scrollBy({ left: 200, behavior: "smooth" });
}
</script>

<template>
  <div class="w-full flex justify-center ">
    <div class="relative flex items-center w-4/5">
        <button 
          @click="scrollLeft" 
          class="absolute -left-10 z-10 bg-gray-700 text-white p-2 rounded-full shadow"
        >
          ◀
        </button>
    
        <div 
          ref="scrollContainer" 
          class="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10"
        >
            <ul>
                <li>
                    
                </li>
                <div 
                  v-for="(item, index) in items" 
                  :key="index" 
                  class="min-w-[150px] h-20 bg-blue-500 text-white flex items-center justify-center rounded-lg shadow"
                >
                  {{ item }}
                </div>
            </ul>
        </div>
    
        <button 
          @click="scrollRight" 
          class="absolute -right-10 z-10 bg-gray-700 text-white p-2 rounded-full shadow"
        >
          ▶
        </button>
    </div>
  </div>
</template>

<style>
/* Ocultar scrollbar en navegadores modernos */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE y Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
