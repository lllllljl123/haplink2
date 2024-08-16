import request from '@/utils/request'

// 查询光交箱列表
export function listOcc(query) {
  return request({
    url: '/device/occ/list',
    method: 'get',
    params: query
  })
}

// 查询光交箱详细
export function getOcc(id) {
  return request({
    url: '/device/occ/' + id,
    method: 'get'
  })
}

// 新增光交箱
export function addOcc(data) {
  return request({
    url: '/device/occ',
    method: 'post',
    data: data
  })
}

// 修改光交箱
export function updateOcc(data) {
  return request({
    url: '/device/occ',
    method: 'put',
    data: data
  })
}

// 删除光交箱
export function delOcc(id) {
  return request({
    url: '/device/occ/' + id,
    method: 'delete'
  })
}
