import request from '@/utils/request'

// 查询巡检内容管理列表
export function listContent(query) {
  return request({
    url: '/assets/content/list',
    method: 'get',
    params: query
  })
}

// 查询巡检内容管理详细
export function getContent(id) {
  return request({
    url: '/assets/content/' + id,
    method: 'get'
  })
}

// 新增巡检内容管理
export function addContent(data) {
  return request({
    url: '/assets/content',
    method: 'post',
    data: data
  })
}

// 修改巡检内容管理
export function updateContent(data) {
  return request({
    url: '/assets/content',
    method: 'put',
    data: data
  })
}

// 删除巡检内容管理
export function delContent(id) {
  return request({
    url: '/assets/content/' + id,
    method: 'delete'
  })
}
