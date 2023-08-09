import request from '@/utils/request'

// 获取轮播图列表
export function userLogin(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
