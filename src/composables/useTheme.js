import { ref, watch } from 'vue'

const theme = ref(localStorage.getItem('theme') || 'system')

function applyTheme(value) {
  const html = document.documentElement;

  if (value === 'dark' || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
  
  localStorage.setItem('theme', value)
}

watch(theme, (newValue) => {
  applyTheme(newValue)
}, { immediate: true })

export function useTheme() {
  return {
    theme,
    setTheme: (val) => (theme.value = val)
  }
}