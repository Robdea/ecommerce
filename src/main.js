import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'
import { router } from './routes/router'

const pinia = createPinia();

createApp(App)
.use(router)
.use(pinia)
.mount('#app')
