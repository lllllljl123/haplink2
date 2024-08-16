import request from '@/utils/request'

// 查询摄像机列表
export function listCamera(query) {
  return request({
    url: '/device/camera/list',
    method: 'get',
    params: query
  })
}

// 查询摄像机详细
export function getCamera(id) {
  return request({
    url: '/device/camera/' + id,
    method: 'get'
  })
}

// 新增摄像机
export function addCamera(data) {
  return request({
    url: '/device/camera',
    method: 'post',
    data: data
  })
}

// 修改摄像机
export function updateCamera(data) {
  return request({
    url: '/device/camera',
    method: 'put',
    data: data
  })
}

// 删除摄像机
export function delCamera(id) {
  return request({
    url: '/device/camera/' + id,
    method: 'delete'
  })
}

// 查询派出所列表
export function selectPoliceStationList() {
  return request({
    url: '/device/camera/selectPoliceStationList',
    method: 'get',
  })
}

// 查询Olt列表
export function selectLocalOltList() {
  return request({
    url: '/device/camera/selectLocalOltList',
    method: 'get',
  })
}

// 查询pon列表
export function selectPonPortList(data) {
  return request({
    url: '/device/camera/selectPonPortList/' ,
    method: 'post',
    data: data
  })
}
