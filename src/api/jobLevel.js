import request from '@/utils/request'
import qs from 'qs'

export const fetchJobLevelsApi = (() => {
  return request({
    url: '/system/basic/level/jobs',
    method: 'get'
  })
})

export const addJobLevelApi = (jobLevel => {
  return request({
    url: '/system/basic/level/add',
    method: 'post',
    data: jobLevel
  })
})

export const deleteJobLevelApi = (id => {
  return request({
    url: '/system/basic/level/delete/' + id,
    method: 'delete'
  })
})

export const editJobLevelApi = (jobLevel => {
  return request({
    url: '/system/basic/level/edit',
    method: 'put',
    data: jobLevel
  })
})

// 批量删除
export const deleteManyApi = (ids => {
  return request({
    url: '/system/basic/level/many',
    method: 'delete',
    params: {
      ids: ids
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
})