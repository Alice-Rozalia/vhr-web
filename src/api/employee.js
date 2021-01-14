import request from '@/utils/request'

export const fetchEmployeeApi = (() => {
  return request({
    url: '/emp/basic/list',
    method: 'get'
  })
})