import request from '@/utils/request'


// 获取轮播图列表
export function swiperList() {
    return request({
        url: '/swiper/getswiper',
        method: 'get'
    })
}



// 修改轮播图
// 参数1 : id
// 参数2 : url
export function updateSwiper(data) {
    return request({
        url: '/swiper/updateswiper',
        method: 'post',
        data
    })
}



// 添加轮播图
// 参数1 : url
export function addSwiper(data) {
    return request({
        url: '/swiper/addswiper',
        method: 'post',
        data
    })
}


// 删除轮播图
// 参数1 : id
export function delSwiper(data) {
    return request({
        url: '/swiper/delswiper',
        method: 'get',
        params : {
            id : data
        }
    })
}