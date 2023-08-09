import request from '@/utils/request'
// 获取所有评分
export function getAllRating() {
    return request({
        url: "/rating/getAllRating",
        method: "post"
    })
}

// 添加评分
export function AddRating(data) {
    return request({
        url: "/rating/AddRating",
        method: "post",
        data
    })
}

// 根据商品id获取评分
export function getRating(data) {
    return request({
        url: "/rating/getrating",
        method: "post",
        data
    })
}

// 根据店铺ID获取评分
export function getRatingByStore(data) {
    return request({
        url: "/rating/getratingtostore",
        method: "post",
        data
    })
}

// 更新评分
export function updaterating(data) {
    return request({
        url: "/rating/updaterating",
        method: "post",
        data
    })
}

// 删除评分
export function delrating(data) {
    return request({
        url: "/rating/delrating",
        method: "post",
        data
    })
}

// 通过ID获取评分
export function getRatingByID(data) {
    return request({
        url: "/rating/getratingbyid",
        method: "post",
        data
    })
}