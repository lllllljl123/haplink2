import request from '@/utils/request'

// 查询维修工单管理列表
export function listRepair(query) {
  return request({
    url: '/assets/repair/list',
    method: 'get',
    params: query
  })
}

// 查询维修工单管理详细
export function getRepair(id) {
  return request({
    url: '/assets/repair/' + id,
    method: 'get'
  })
}

// 新增维修工单管理
export function addRepair(data) {
  return request({
    url: '/assets/repair',
    method: 'post',
    data: data
  })
}

// 修改维修工单管理
export function updateRepair(data) {
  return request({
    url: '/assets/repair',
    method: 'put',
    data: data
  })
}

// 删除维修工单管理
export function delRepair(id) {
  return request({
    url: '/assets/repair/' + id,
    method: 'delete'
  })
}
