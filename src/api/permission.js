import request from '@/utils/request'
import qs from 'qs'

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

export const fetchMenusByRidApi = (id => {
  return request({
    url: '/system/basic/permission/menus/' + id,
    method: 'get'
  })
})

export const fetchMidsByRidApi = (id => {
  return request({
    url: '/system/basic/permission/mids/' + id,
    method: 'get'
  })
})

export const updateMenuRoleApi = ((rid, mids) => {
  return request({
    url: '/system/basic/permission/assign',
    method: 'put',
    params: {
      rid: rid,
      mids: mids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
})

export const addRoleApi = (role => {
  return request({
    url: '/system/basic/permission/add',
    method: 'post',
    data: role
  })
})

export const deleteRoleByIdApi = (id => {
  return request({
    url: '/system/basic/permission/delete/' + id,
    method: 'delete'
  })
})