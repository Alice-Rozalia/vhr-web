import axios from 'axios'
import NProgress from 'nprogress'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 5000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

request.interceptors.request.use(config => {
  NProgress.start()
  return config.data
})

request.interceptors.response.use(config => {
  NProgress.done()
  if (!config.data.success) {
    message.error(config.data.message || '服务器端异常！')
  }
  return config
})

export default request