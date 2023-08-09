import React, { useEffect, useRef, useState } from "react";
import { Table, Button, Popconfirm, message } from 'antd';
import SetDelivery from "./setDelivery";
import { getDeliveryList, delDelivery } from '../../api/deliver';
export default function Delivery() {
    const { Column } = Table;
    let [list, setList] = useState([])
    // 获取快递列表
    useEffect(() => {
        async function getDelivery() {
            let res = await getDeliveryList();
            let data = res.data.data;
            setList(data)
        }
        getDelivery();
    }, []);
    // 删除快递
    const confirm = async (e, row) => {
        let res = await delDelivery(row.id);
        let newList = [];
        newList = list.filter(v => {
            return v !== row
        })
        setList(newList)
        message.success('删除成功');
    }

    function cancel(e) {
        message.error('删除失败');
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
            <Table dataSource={list} rowKey='id'
            >
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="快递单号" dataIndex="postid" key="postid" />
                <Column title="快递公司" dataIndex="ecp" key="ecp" />
                <Column title="收货地址" dataIndex="address" key="address" />
                <Column
                    title="下单时间"
                    dataIndex="create_time"
                    key="create_time"
                />
                <Column title="订单id" dataIndex="order_id" key="order_id" />
                <Column title="快递是否收货(0未收货/1收货)" dataIndex="is_delete" key="is_delete" />
                <Column
                    title="修改"
                    key="update"
                    render={(row) => (
                        <span>
                            <SetDelivery data={row} update={update}>修改</SetDelivery>
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
