import request from '@/utils/request'

// 查询成品库类别
export function finishedList() {
    return request({
        url: '/finished/category/list',
        method: 'get',
    })
}

// 查询列表
export function libraryList(query) {
    return request({
        url: '/finished/library/list',
        method: 'get',
        params: query
    })
}

// 通过类别获取工程做法数据
export function getEngineeringPracticeByCategory(query) {
    return request({
        url: '/finished/library/getEngineeringPracticeByCategory',
        method: 'get',
        params: query
    })
}

// 新增
export function insert(data) {
    return request({
        url: '/finished/library/insert',
        method: 'post',
        data: data
    })
}

// 修改
export function updatePractices(data) {
    return request({
        url: '/finished/library/update',
        method: 'put',
        data: data
    })
}

// 删除用户
export function del(ids) {
    return request({
        url: `/finished/library/delete/${ids}`,
        method: 'delete'
    })
}
