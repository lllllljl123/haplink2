import request from '@/utils/request'

// 查询巡检记录列表
export function listRecord(data) {
  return request({
    url: '/assets/record/list',
    method: 'post',
    data: data
  })
}

// 查询巡检记录详细
export function getRecord(id) {
  return request({
    url: '/assets/record/' + id,
    method: 'get'
  })
}

// 新增巡检记录
export function addRecord(data) {
  return request({
    url: '/assets/record',
    method: 'post',
    data: data
  })
}

// 修改巡检记录
export function updateRecord(data) {
  return request({
    url: '/assets/record',
    method: 'put',
    data: data
  })
}

// 删除巡检记录
export function delRecord(id) {
  return request({
    url: '/assets/record/' + id,
    method: 'delete'
  })
}

// 提交巡检记录
export function submitRecord(data) {
  return request({
    url: '/assets/record/submit',
    method: 'post',
    data: data
  })
}
