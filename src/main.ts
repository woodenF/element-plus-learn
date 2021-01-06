import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/assets/theme-chalk/src/index.scss'
import Button from '@/components/button/index'
import Dialog from '@/components/dialog/index'
import Preview from '@/components/preview/index'

import OtherInput from '@/otherComponents/input/index.vue'

const app = createApp(App)
            .use(store)
            .use(router)
            .use((Preview as any).install)
            .use(Button.install)
            .use(Dialog.install)
            .component(OtherInput.name, OtherInput)
            .mount('#app')