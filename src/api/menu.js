import request from '@/utils/request'

export const getMenusApi = (() => {
  return request({
    url: '/system/config/menu',
    method: 'get'
  })
})