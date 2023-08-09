import request from '@/utils/request'
// 获取退款列表
export function getBackstock(user_id) {
    return request({
        url: '/backstock/getBackstock',
        method: 'post',
        data: {
            user_id
        }
    })
}
// 添加退款订单
export function addBackstock(data) {
    return request({
        url: '/backstock/addBackstock',
        method: 'post',
        data: {
            ...data
        }
    })
}

// 修改退单订单
export function setBackstock(data) {
    return request({
        url: '/backstock/setBackstock',
        method: 'post',
        data: {
            ...data
        }
    })
}
// 删除退款订单
export function delBackstock(id) {
    return request({
        url: '/backstock/delBackstock',
        method: 'post',
        data: {
            id
        }
    })
}