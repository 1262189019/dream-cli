import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from 'antd';
import SetBack from "./setBack"
import { getBackstock, delBackstock } from '../../api/backStore';
export default function BackStore() {
  const { Column } = Table;
  let [list, setList] = useState([])
  // 获取退款列表
  useEffect(() => {
    async function getBack() {
      let res = await getBackstock();
      let data = res.data.result;
      data.forEach(v => {
        v.imgs = JSON.parse(v.imgs)
        var date = new Date(v.create_time)
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        v.create_time = `${year}年${month}月${day}日 ${hours}点${minutes}分`;
        var date1 = new Date(v.update_time)
        var year1 = date1.getFullYear();
        var month1 = date1.getMonth() + 1;
        var day1 = date1.getDate();
        var hours1 = date1.getHours();
        var minutes1 = date1.getMinutes();
        v.update_time = `${year1}年${month1}月${day1}日 ${hours1}点${minutes1}分`;
      })
      // data.
      setList(data)
    }
    getBack()
  }, []);
  // 删除退款列表  
  const confirm = async (e, row) => {
     await delBackstock(row.id);
    let newList = [];
    newList = list.filter(v => {
      return v !== row
    })
    setList(newList)
    message.success('删除成功');
  }

  function cancel(e) {
    message.error('取消删除');
  }
  // 更新
  const update = (item) => {
    let newList = []
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === item.id) {
        newList.push(item)
      } else {
        newList.push(list[i])
      }
    }
    setList(newList)
  }
  return (
    <div className="app-container">
      <Table dataSource={list} rowKey='id'>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="订单id" dataIndex="order_id" key="order_id" />
        <Column title="申请退款时间" dataIndex="create_time" key="create_time" />
        <Column title="操作时间" dataIndex="update_time" key="update_time" />
        <Column title="处理状态" dataIndex="status" key="status" />
        <Column
          title="退货原因"
          dataIndex="reason"
          key="reason"
        />
        <Column title="退款金额" dataIndex="money" key="money" />
        <Column title="凭证图片" dataIndex="imgs" key="imgs" render={(avatar, a) => {
          return <img src={avatar} alt="Avatar" style={{ width: '50px' }} />
        }} />
        <Column
          title="修改"
          key="update"
          render={(row) => (
            <span>
              <SetBack data={row} update={update}>修改</SetBack>
            </span>
          )}
        />
        <Column
          title="删除"
          key="action"
          render={(row) => (
            <span>
              <Popconfirm
                title="确定删除"
                onConfirm={(e) => confirm(e, row)}
                onCancel={cancel}
                okText="确定"
                cancelText="取消"
              >
                <Button type="danger" style={{ marginLeft: "10px" }}>删除</Button>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
    </div >
  );
}
