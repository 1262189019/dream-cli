import React, { useState, useEffect, useRef } from 'react'
import { getCategoryList, addCategory, delCategory, updateCategory } from '../../api/sortmanage.js'
import './index.less'
import { Modal, Button, Input, Table, Popconfirm, message } from 'antd';
import SetSortmanage from './setSortmanage.jsx'
export default function CategoryList() {
  const [datas, setDatas] = useState([])



  useEffect(() => {
    getCategoryList().then(res => {
      let data = res.data.data
      data.forEach((v, i) => {
        v.key = i
        v.action = v
        v.sort = '暂无'
      })
      setDatas(data)
    })
  }, [])
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'parent_name',
      dataIndex: 'parent_name',
      key: 'parent_name'
    },
    {
      title: 'sort',
      dataIndex: 'sort',
      key: 'sort'
    },
    {
      title: '修改',
      dataIndex: 'action',
      key: "action",
      render(item) {
        return (
          <div>
            {/* <Button type="primary" onClick={() => showModal(item.id)}>修改</Button> */}
            <SetSortmanage obj={item} updata={(v => {
              let newDatas = []
              for(let i = 0; i < datas.length; i++){
                newDatas.push(v[i])
              }
              setDatas(newDatas)
            })}>修改</SetSortmanage>
          </div>
        )
      }
    },
    {
      title: '删除',
      dataIndex: 'action',
      key: "actin",
      render(item) {
        return (
          <div>
            <Popconfirm title="确定要删除吗？" onConfirm={() => del(item)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        )
      }
    },
  ];

  // 删除分类
  function del(item) {
    delCategory({ id: item.id }).then(res => {
      if (res.status === 200) {
        message.info(res.data.msg)
        setDatas(datas.filter((v) => v.id !== item.id))
      } else {
        message.info(res.data.msg)
      }
    })
  }


  return (
    <div className='box'>
      {/* 渲染数据 */}
      <Table columns={columns} dataSource={datas} />

    </div>
  )
}