import request from '@/utils/request'
export function getBrand() {
  return request({
    url: '/brand/getBrand',
    method: 'post'
  })
}

export function addBrand(data){
  return request({
    url:'/brand/addBrand',
    method:'post',
    data:{
      ...data
    }
  })
}

export function delBrand(id){
  return request({
    url:'/brand/delBrand',
    method:'post',
    data:{
      id
    }
  })
}

export function updateBrand(data){
  return request({
    url:'/brand/updateBrand',
    method:'post',
    data:{
      ...data
    }
  })
}