import request from '@/utils/request'

// 查询巡检记录详情列表
export function listDetails(data) {
  return request({
    url: '/assets/details/list',
    method: 'post',
    data: data
  })
}

// 查询巡检记录详情详细
export function getDetails(id) {
  return request({
    url: '/assets/details/' + id,
    method: 'get'
  })
}

// 新增巡检记录详情
export function addDetails(data) {
  return request({
    url: '/assets/details',
    method: 'post',
    data: data
  })
}

// 修改巡检记录详情
export function updateDetails(data) {
  return request({
    url: '/assets/details',
    method: 'put',
    data: data
  })
}

// 删除巡检记录详情
export function delDetails(id) {
  return request({
    url: '/assets/details/' + id,
    method: 'delete'
  })
}
