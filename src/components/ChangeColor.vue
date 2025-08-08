<script setup>
import { useTheme } from '../composables/useTheme'

const { theme, setTheme } = useTheme()

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <button @click="toggleTheme">
    Cambiar a {{ theme === 'dark' ? 'light' : 'dark' }}
  </button>
</template>