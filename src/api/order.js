import request from '@/utils/request'

export function GetOrderList() {
    return request({
        url: '/order/getOrderList',
        method: 'get',
    })
}

export function GetOrder(data) {
    return request({
        url: '/order/getOrder',
        method: 'get',
        params: data
    })
}

export function DelOrder(data) {
    return request({
        url: '/order/delOrder',
        method: 'get',
        params: data
    })
}

export function AddOrder(data) {
    return request({
        url: '/order/addOrder',
        method: 'get',
        params: data
    })
}

export function SetOrder(data) {
    return request({
        url: '/order/setOrder',
        method: 'get',
        params: data
    })
}