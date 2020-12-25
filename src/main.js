import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupAntd } from '@/plugins/antd'
import { message, Modal } from 'ant-design-vue'

import './style/index.less'

const app = createApp(App)

app.config.globalProperties.$message = message
app.config.globalProperties.$Modal = Modal
setupAntd(app)

app.use(store).use(router).mount('#app')
