import request from '@/utils/request'

// 查询消息模板列表
export function listTemplate(query) {
  return request({
    url: '/management/template/list',
    method: 'get',
    params: query
  })
}

// 查询消息模板列表
export function recordsTemplate(query) {
  return request({
    url: '/management/template/records',
    method: 'get',
    params: query
  })
}

// 查询消息模板详细
export function getTemplate(id) {
  return request({
    url: '/management/template/' + id,
    method: 'get'
  })
}

// 新增消息模板
export function addTemplate(data) {
  return request({
    url: '/management/template',
    method: 'post',
    data: data
  })
}

// 修改消息模板
export function updateTemplate(data) {
  return request({
    url: '/management/template',
    method: 'put',
    data: data
  })
}

// 删除消息模板
export function delTemplate(id) {
  return request({
    url: '/management/template/' + id,
    method: 'delete'
  })
}
