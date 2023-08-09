import request from '@/utils/request'
// 获取快递
export function getDeliveryList() {
    return request({
        url: '/delivery/getDeliveryList',
        method: 'post'
    })
}
// 添加快递
export function addDelivery(data) {
    return request({
        url: 'delivery/addDelivery',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除快递
export function delDelivery(id) {
    return request({
        url: '/delivery/delDelivery',
        method: 'post',
        data: {
            id
        }
    })
}
// 修改快递
export function updateDelivery(data) {
    return request({
        url: '/delivery/updateDelivery',
        method: 'post',
        data: {
            ...data
        }
    })
}