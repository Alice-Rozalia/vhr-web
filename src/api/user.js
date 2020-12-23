import request from '@/utils/request'

export const loginApi = (data => {
  return request({
    url: '/doLogin',
    method: 'post',
    data: data
  })
})