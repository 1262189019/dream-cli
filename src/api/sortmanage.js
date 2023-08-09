import request from '@/utils/request.js'

/**
 * 获取总的分类列表
 * post请求
 */
export function getCategoryList() {
    return request({
        url: '/category/getCategoryList',
        method: 'post'
    })
}

/**
 * 获取一级分类列表
 * post请求
 */
export function getParentName() {
    return request({
        url: '/category/getParentName',
        method: 'post'
    })
}

/**
 * 通过一级分类列表获取二级分类列表
 * post请求
 * @parentName 一级分类 必填
 */
export function getSecondName(data) {
    return request({
        url: '/category/getSecondName',
        method: 'post',
        data
    })
}

/**
 * 添加分类
 * post请求
 * @parentName 一级分类 必填
 * @secondName 二级分类 必填
 */
export function addCategory(data) {
    return request({
        url: '/category/addCategory',
        method: 'post',
        data
    })
}

/**
 * 删除分类
 * post请求
 * @id 数据库中该分类对应的id值 必填
 */
export function delCategory(data) {
    return request({
        url: '/category/delCategory',
        method: 'post',
        data
    })
}

/**
 * 更新分类
 * post请求
 * @parentName 一级分类 必填
 * @secondName 二级分类 必填
 * @id 数据库中该分类对应的id值 必填
 */
export function updateCategory(data) {
    return request({
        url: '/category/updateCategory',
        method: 'post',
        data
    })
}