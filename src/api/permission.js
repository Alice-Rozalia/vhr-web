import request from '@/utils/request'

export const fetchRolesApi = (() => {
  return request({
    url: '/system/basic/permission/roles',
    method: 'get'
  })
})

export const fetchMenusApi = (() => {
  return request({
    url: '/system/basic/permission/menus',
    method: 'get'
  })
})