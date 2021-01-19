import request from '@/utils/request'

export const fetchEmployeeApi = (query => {
  return request({
    url: '/emp/basic/list',
    method: 'get',
    params: query
  })
})

export const fetchNationsApi = (() => {
  return request({
    url: '/emp/basic/nations',
    method: 'get'
  })
})

export const fetchPoliticsstatusApi = (() => {
  return request({
    url: '/emp/basic/politicsstatus',
    method: 'get'
  })
})

export const fetchMaxWorkIdApi = (() => {
  return request({
    url: '/emp/basic/max_work_id',
    method: 'get'
  })
})

export const addEmployeeApi = (data => {
  return request({
    url: '/emp/basic/add',
    method: 'post',
    data: data
  })
})