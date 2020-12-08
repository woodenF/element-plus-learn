import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/theme-chalk/src/index.scss'
import Button from '@/components/button/index'

const app = createApp(App)
            .use(store)
            .use(router)
            .component(Button.name, Button)
            .mount('#app')