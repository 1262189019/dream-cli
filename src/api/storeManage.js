import request from '@/utils/request'
// 获取商户数据表
export function getStoreList() {
    return request({
        url: '/store/getStoreList',
        method: 'post'
    })
}
// 删除商户数据表
export function delStore(data) {
    return request({
        url: '/store/delStore',
        method: 'post',
        data
    })
}
// 更新商户数据表
export function updateStore(data) {
    return request({
        url: '/store/updateStore',
        method: 'post',
        data
    })
}

// 添加商户
export function addStoreList(data) {
    return request({
      url: '/store/addStore',
      method: 'post',
      data
    })
  }