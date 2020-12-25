import request from '@/utils/request'

export const loginApi = (data => {
  return request({
    url: `/doLogin?username=${data.username}&password=${data.password}`,
    method: 'post'
  })
})

export const logoutApi = (() => {
  return request({
    url: '/logout',
    method: 'get'
  })
})