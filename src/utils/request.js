import axios from 'axios'
import NProgress from 'nprogress'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

request.interceptors.request.use(config => {
  NProgress.start()
  return config.data
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(config => {
  NProgress.done()
  return config
})

export default request