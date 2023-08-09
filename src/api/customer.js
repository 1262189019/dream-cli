import request from '@/utils/request'

// 添加客户
export function register(requestData) {
    return request({
      url: '/customer/register',
      method: 'post',
      data: requestData 
    })
  }

// 删除客户
export function deletecustomer(username) {
  return request({
    url: '/customer/deleteUser',
    method: 'post',
    data:{username},
  })
}
// 获取客户
export function userlist(data) {
  return request({
    url: '/customer/getUserList',
    method: 'post',
    data, 
  })
}



// 更新客户
export function updatecustomer(requestData) {
return request({
  url: '/customer/changepsd',
  method: 'post',
  data: requestData 
})
}