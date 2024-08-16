import request from '@/utils/request'

// 查询设备管理-摄像机修改记录列表
export function listHistory(query) {
  return request({
    url: '/device/history/list',
    method: 'get',
    params: query
  })
}

// 查询设备管理-摄像机修改记录详细
export function getHistory(id) {
  return request({
    url: '/device/history/' + id,
    method: 'get'
  })
}

// 新增设备管理-摄像机修改记录
export function addHistory(data) {
  return request({
    url: '/device/history',
    method: 'post',
    data: data
  })
}

// 修改设备管理-摄像机修改记录
export function updateHistory(data) {
  return request({
    url: '/device/history',
    method: 'put',
    data: data
  })
}

// 删除设备管理-摄像机修改记录
export function delHistory(id) {
  return request({
    url: '/device/history/' + id,
    method: 'delete'
  })
}

// 查询未提交、未审核数量
export function changeSum() {
  return request({
    url: '/device/history/sum',
    method: 'get'
  })
}

// 修改设备管理-记录审核
export function audited(data) {
  return request({
    url: '/device/history/audited',
    method: 'post',
    data: data
  })
}

// 查询设备管理-摄像机修改记录详细
export function getCameraHistory(id) {
  return request({
    url: '/device/history/camera/' + id,
    method: 'get'
  })
}

