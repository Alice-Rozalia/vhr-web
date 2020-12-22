import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupAntd } from '@/plugins/antd'

const app = createApp(App)

setupAntd(app)

app.use(store).use(router).mount('#app')
