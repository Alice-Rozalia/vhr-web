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
  const token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(config => {
  NProgress.done()
  if (!config.data.success) {
    message.error(config.data.message || '服务器端异常！')
  }
  return config
}, error => {
  if (error.response.status == 504 || error.response.status == 404) {
    message.error('服务器被吃了( ╯□╰ )！')
  } else if (error.response.status == 403) {
    message.error('权限不足！')
  } else {
    if (error.response.data.msg) {
      message.error(error.response.data.message)
    } else {
      message.error('未知错误！')
    }
  }
  return
})

export default request