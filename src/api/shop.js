import request from '@/utils/request'

// 添加商品
export function addshop(requestData) {
    return request({
      url: '/shop/addSpu',
      method: 'post',
      data: requestData 
    })
  }
// 删除商品
  export function deleteshop(id) {
    return request({
      url: '/shop/delSpu',
      method: 'post',
      data:{id},
    })
  }
// 获取商品  
  export function shoplist(page,data) {
    const requestData = { page, ...data };
    return request({
      url: '/shop/getShoplist',
      method: 'post',
      data: requestData 
    })
  }

// 更新商品  
export function updateshop(requestData) {
  return request({
    url: '/shop/updataSpu',
    method: 'post',
    data: requestData 
  })
}

// 获取分类列表
export function getClassify(requestData) {
    return request({
      url: '/shop/getClassify',
      method: 'post',
      data:requestData
    })
  }





  // 获取商品  
  export function tshoplist(data) {
    return request({
      url: '/sku/getshop',
      method: 'post',
      data,
    })
  }
// 添加商品
export function addtshop(requestData) {
  return request({
    url: '/sku/addshop',
    method: 'post',
    data: requestData 
  })
}

// 删除商品
export function deletetshop(id) {
  return request({
    url: '/sku/deleteshop',
    method: 'post',
    data:{id},
  })
}
// 更新商品  
export function updatetshop(requestData) {
  return request({
    url: '/sku/changeshop',
    method: 'post',
    data: requestData 
  })
}

// 根据id获取商品
export function getshopitem(requestData) {
  return request({
    url: '/sku/getItemshop',
    method: 'post',
    data: requestData 
  })
}

