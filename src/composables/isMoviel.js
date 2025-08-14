import { onMounted, onUnmounted, ref } from "vue"


export function useWindowSize(breakpoint = 630) {
    
    const windowWidth = ref(window.innerWidth)
    const isMobile = ref(window.innerWidth < breakpoint)
    
    function handleResize() {
        windowWidth.value = window.innerWidth;
        isMobile.value = windowWidth.value < breakpoint;
    }
    
    onMounted(() =>{
        window.addEventListener("resize", handleResize)
    })
    
    onUnmounted(() =>{
        window.removeEventListener("resize", handleResize)
    })

    return {windowWidth, isMobile}
}
