import React, { useEffect, useState } from "react";
import {
  Table, Divider,
  Input,
  Select,
} from 'antd';
import { ShopCarList } from '@/api/shopcar.js'
import SetShopcar from './setsShopcar'
const { Option } = Select;
const { Search } = Input;
export default () => {
  let [CarList, setCarList] = useState([])
  let [searchId, SetsearchId] = useState('id')
  let [list, setList] = useState([])
  useEffect(() => {
    ShopCarList(65).then(result => {
      if (result.status === 200) {
        let res = result.data.data
        res.forEach((i, index) => {
          i.key = index
          i.params = JSON.parse(i.params)
          i.title = i.params[0].title
          i.img = i.params[0].img
          i.price = i.params[0].price
          i.type = i.params[0].type
          i.stock = i.params[0].stock
        })
        setCarList(res)
        setList(res)
      }
    })

  }, [])

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',


    },
    {
      title: '客户id',
      dataIndex: 'customer_id',
      key: 'customer_id',

    },
    {
      title: '商品id',
      dataIndex: 'sku_id',
      key: 'sku_id',

    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',


    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',

    },
    {
      title: '类型',
      dataIndex: 'dftype',
      key: 'dftype',

    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',

    },
    {
      title: '图片',
      dataIndex: 'img',
      key: 'img',

      render: (avatar) => <img src={avatar} alt="Avatar" style={{ width: '50px' }} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (item) => {
        return (
          <span>
            <SetShopcar data={item} handlerClickDb={changeState}>修改</SetShopcar>
            <Divider type="vertical" />
          </span>
        )
      }
    },
  ];


  let changeState = (state, type) => {
    let newArray = []
    if (type === 'update') {
      for (let i = 0; i < CarList.length; i++) {
        if (CarList[i].sku_id === state.sku_id && CarList[i].customer_id === state.customer_id) {
          CarList[i].dftype = state.dftype
          CarList[i].num = state.num
          CarList[i].params = state.params
        }
        newArray.push(CarList[i])

      }
      setCarList(newArray)
      setList(...CarList)
    }
    if (type === 'del') {
      setCarList(CarList.filter(i => !(i.sku_id === state.sku_id && i.customer_id === state.customer_id)
      ))
      setList(...CarList)
    }
  }
  let handleChange = (value) => {
    SetsearchId(value)
  }


  let handleSearch = (value) => {
    list.filter(i => i[searchId] == value)
    if (list.length === 'underfined') {
      return
    }
    setCarList(list.filter(i => i[searchId] == value))
  }

  return (
    <div className="app-container">
      <Select defaultValue={searchId} style={{ width: 120 }} onChange={(value) => handleChange(value)} size="large">
        <Option value="id">购物车商品id</Option>
        <Option value="sku_id">商品id</Option>
        <Option value="customer_id">客户id</Option>
      </Select>
      <Search
        placeholder="输入id搜索"
        onSearch={value => handleSearch(value)}
        style={{ width: "400px", marginBottom: "10px" }}
        enterButton
        size="large"
      />
      <Table columns={columns} dataSource={CarList} >
      </Table>

    </div>
  )
}
