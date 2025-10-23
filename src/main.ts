import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import { router } from './router'
import App from './App.vue'
import './style.css'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
