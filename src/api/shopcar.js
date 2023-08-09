import request from '@/utils/request'
export function ShopCarList(id) {
  return request({
    url: '/shopcar/getshopCarList',
    method: 'post',
    data:{
      customer_id:id
    }
  })
}


export function Addshopcar(data) {
  return request({
    url: '/shopcar/Addshopcar',
    method: 'post',
    data
  })
}
export function DeleteShopCar(data) {
  return request({
    url: '/shopcar/DeleteShopCar',
    method: 'post',
    data
  })
}