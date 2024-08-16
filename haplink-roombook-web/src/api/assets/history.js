import request from '@/utils/request'

// 查询变更记录列表
export function listHistory(query) {
  return request({
    url: '/assets/history/list',
    method: 'get',
    params: query
  })
}

// 查询变更记录详细
export function getHistory(id) {
  return request({
    url: '/assets/history/' + id,
    method: 'get'
  })
}

// 新增变更记录
export function addHistory(data) {
  return request({
    url: '/assets/history',
    method: 'post',
    data: data
  })
}

// 修改变更记录
export function updateHistory(data) {
  return request({
    url: '/assets/history',
    method: 'put',
    data: data
  })
}

// 删除变更记录
export function delHistory(id) {
  return request({
    url: '/assets/history/' + id,
    method: 'delete'
  })
}
