import request from '@/utils/request'

// 查询固定资产登记列表
export function listInfo(query) {
  return request({
    url: '/assets/info/list',
    method: 'get',
    params: query
  })
}

// 查询固定资产登记详细
export function getInfo(id) {
  return request({
    url: '/assets/info/' + id,
    method: 'get'
  })
}

// 新增固定资产登记
export function addInfo(data) {
  return request({
    url: '/assets/info',
    method: 'post',
    data: data
  })
}

// 修改固定资产登记
export function updateInfo(data) {
  return request({
    url: '/assets/info',
    method: 'put',
    data: data
  })
}

// 删除固定资产登记
export function delInfo(id) {
  return request({
    url: '/assets/info/' + id,
    method: 'delete'
  })
}

// 报废固定资产登记
export function scrappedInfo(id) {
  return request({
    url: '/assets/info/scrapped/' + id,
    method: 'put'
  })
}

// 打印固定资产登记标签
export function printInfo(id) {
  return request({
    url: '/assets/info/print/' + id,
    method: 'put'
  })
}
