import request from '@/utils/request'

export const getPositionsApi = (() => {
  return request({
    url: '/system/basic/position/list',
    method: 'get'
  })
})