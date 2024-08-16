import request from '@/utils/request'

// 查询巡检任务列表
export function listJob(data) {
  return request({
    url: '/assets/job/list',
    method: 'post',
    data: data
  })
}

// 查询巡检任务详细
export function getJob(id) {
  return request({
    url: '/assets/job/' + id,
    method: 'get'
  })
}

// 新增巡检任务
export function addJob(data) {
  return request({
    url: '/assets/job',
    method: 'post',
    data: data
  })
}

// 修改巡检任务
export function updateJob(data) {
  return request({
    url: '/assets/job',
    method: 'put',
    data: data
  })
}

// 删除巡检任务
export function delJob(id) {
  return request({
    url: '/assets/job/' + id,
    method: 'delete'
  })
}
