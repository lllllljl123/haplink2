import request from '@/utils/request'

// 查询物料登记列表
export function listMaterials(query) {
  return request({
    url: '/assets/materials/list',
    method: 'get',
    params: query
  })
}

// 查询物料登记详细
export function getMaterials(id) {
  return request({
    url: '/assets/materials/' + id,
    method: 'get'
  })
}

// 新增物料登记
export function addMaterials(data) {
  return request({
    url: '/assets/materials',
    method: 'post',
    data: data
  })
}

// 修改物料登记
export function updateMaterials(data) {
  return request({
    url: '/assets/materials',
    method: 'put',
    data: data
  })
}

// 删除物料登记
export function delMaterials(id) {
  return request({
    url: '/assets/materials/' + id,
    method: 'delete'
  })
}

// 报废固定资产登记
export function scrappedMaterials(id) {
  return request({
    url: '/assets/materials/scrapped/' + id,
    method: 'put'
  })
}

// 打印固定资产登记标签
export function printInfo(id) {
  return request({
    url: '/assets/materials/print/' + id,
    method: 'put'
  })
}
