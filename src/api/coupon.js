import request from '@/utils/request'

// 获取指定用户优惠卷列表
export function getUserCustomerList(data) {
    return request({
      url: '/coupon/getUserCustomerList',
      method: 'get',
      params : {
        customer_id:data
      }
    })
  }


// 添加优惠卷
  export function addCustomer(data) {
    return request({
      url: '/coupon/addCustome',
      method: 'post',
      data 
    })
  }

// 删除优惠卷
  export function delCustomer(data) {
    return request({
      url: '/coupon/delCustomer',
      method: 'get',
      params : {
        voucher_id:data
      }
    })
  }

// 更新优惠卷
  export function updateCustomer(data) {
    return request({
      url: '/coupon/updateCustomer',
      method: 'post',
      data
    })
  }

  // 获取所有优惠卷
  export function getAllVoucher() {
    return request({
      url: '/coupon/getAllVoucher',
      method: 'get',
    })
  }

// 获取所有客户优惠卷
  export function getAllCustomerVoucher() {
    return request({
      url: '/coupon/getAllCustomerVoucher',
      method: 'get',
    })
  }