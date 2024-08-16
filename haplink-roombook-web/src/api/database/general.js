import request from '@/utils/request';

export function ListTab() {
  return request({
    url: '/orgStructure/list',
    method: 'get',
  });
}

export function ListTable(params) {
  return request({
    url: '/practice/library/list',
    method: 'get',
    params
  });
}

export function deleteItem(ids){
  return request({
    url:'/practice/library/delete/' + ids,
    method:'delete',
    // params: { ids: ids },
    })
}

export function insertItem(data){
  return request({
    url:'/practice/library/insert',
    method:'post',
    data:data
  })
}

export function updateItem(data){
  return request({
    url:'/practice/library/update',
    method:'put',
    data:data
  })
}

export function getItemByOrgId(data){
  const params = new URLSearchParams(data).toString();

  return request({
    url: '/practice/library/getLibraryListByOrgId?' + params,
    method: 'get',
  });
}

export function batchInsert(data){
  return request({
    url:'/practice/library/saveBatch',
    method:'post',
    data:data
  })
}
