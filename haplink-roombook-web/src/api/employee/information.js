import request from '@/utils/request'

// 查询人员管理列表
export function listEmployee(query) {
  return request({
    url: '/employee/list',
    method: 'get',
    params: query
  })
}

// 查询人员管理详细
export function getEmployee(id) {
  return request({
    url: '/employee/' + id,
    method: 'get'
  })
}

// 新增人员管理
export function addEmployee(data) {
  return request({
    url: '/employee',
    method: 'post',
    data: data
  })
}

// 修改人员管理
export function updateEmployee(data) {
  return request({
    url: '/employee',
    method: 'put',
    data: data
  })
}

// 删除人员管理
export function delEmployee(id) {
  return request({
    url: '/employee/' + id,
    method: 'delete'
  })
}

// 导出人员附件zip
export function zipDownload(query) {
  return request({
    url: '/employee/zipDownload',
    method: 'get',
    params: query
  })
}
