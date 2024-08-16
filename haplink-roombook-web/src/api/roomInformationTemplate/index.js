import request from '@/utils/request'

// 获取表头列表
export function getHeaderList(query) {
    return request({
        url: '/roomMessage/getHeaderList',
        method: 'get',
        params: query
    })
}

// 列表
export function roomMessageList(query) {
    return request({
        url: '/roomMessage/list',
        method: 'get',
        params: query
    })
}

// 新增
export function roomMessageInsert(data) {
    return request({
        url: '/roomMessage/insert',
        method: 'post',
        data: data
    })
}

// 修改
export function roomMessageUpdate(data) {
    return request({
        url: '/roomMessage/update',
        method: 'put',
        data: data
    })
}

// 删除用户
export function roomMessageDelete(ids) {
    return request({
        url: `/roomMessage/delete/${ids}`,
        method: 'delete'
    })
}
