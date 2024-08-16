import request from '@/utils/request'

// 查询备品取用管理列表
export function listParts(query) {
  return request({
    url: '/assets/parts/list',
    method: 'get',
    params: query
  })
}

// 查询备品取用管理详细
export function getParts(id) {
  return request({
    url: '/assets/parts/' + id,
    method: 'get'
  })
}

// 新增备品取用管理
export function addParts(data) {
  return request({
    url: '/assets/parts',
    method: 'post',
    data: data
  })
}

// 修改备品取用管理
export function updateParts(data) {
  return request({
    url: '/assets/parts',
    method: 'put',
    data: data
  })
}

// 删除备品取用管理
export function delParts(id) {
  return request({
    url: '/assets/parts/' + id,
    method: 'delete'
  })
}
