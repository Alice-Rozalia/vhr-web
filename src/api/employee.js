import request from '@/utils/request'

export const fetchEmployeeApi = (query => {
  return request({
    url: '/emp/basic/list',
    method: 'get',
    params: query
  })
})