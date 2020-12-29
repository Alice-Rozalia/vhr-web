import request from '@/utils/request'

export const fetchDepartmentsApi = (() => {
  return request({
    url: '/system/basic/department/list',
    method: 'get'
  })
})