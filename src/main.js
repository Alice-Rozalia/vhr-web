import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { message, Modal } from 'ant-design-vue'
import { initMenu } from '@/utils/menus'

import './style/index.less'

const app = createApp(App)

app.config.globalProperties.$message = message
app.config.globalProperties.$Modal = Modal
app.use(Antd)

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    if (window.sessionStorage.getItem('user')) {
      initMenu(router, store)
      next()
    } else {
      next('/?redirect=' + to.path)
    }
  }
})

app.use(store).use(router).mount('#app')
