import request from '@/utils/request'
import qs from 'qs'

export const getPositionsApi = (() => {
  return request({
    url: '/system/basic/position/list',
    method: 'get'
  })
})

export const addPositionsApi = (position => {
  return request({
    url: '/system/basic/position/add',
    method: 'post',
    data: position
  })
})

export const deletePositionsApi = (id => {
  return request({
    url: '/system/basic/position/delete/' + id,
    method: 'delete'
  })
})

export const editPositionsApi = (position => {
  return request({
    url: '/system/basic/position/edit',
    method: 'put',
    data: position
  })
})

// 批量删除
export const deleteManyApi = (ids => {
  return request({
    url: '/system/basic/position/many',
    method: 'delete',
    params: {
      ids: ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
})