import request from '@/utils/request'

// 查询OLT列表
export function listOlt(query) {
  return request({
    url: '/device/olt/list',
    method: 'get',
    params: query
  })
}

// 查询OLT详细
export function getOlt(id) {
  return request({
    url: '/device/olt/' + id,
    method: 'get'
  })
}

// 新增OLT
export function addOlt(data) {
  return request({
    url: '/device/olt',
    method: 'post',
    data: data
  })
}

// 修改OLT
export function updateOlt(data) {
  return request({
    url: '/device/olt',
    method: 'put',
    data: data
  })
}

// 删除OLT
export function delOlt(id) {
  return request({
    url: '/device/olt/' + id,
    method: 'delete'
  })
}
