import React, { useState, useEffect } from 'react'
import { GetOrderList, DelOrder, SetOrder } from '@/api/order.js'
import { Table, Divider, Tag, Button, Modal, Form, Input, message } from 'antd';
import OrderSet from './setOrder'
const { Search } = Input;
const Order = (props) => {

    // console.log(props);
    let [list, setList] = useState([]);
    let [obj, setObj] = useState([]);


    useEffect(() => {
        getList()
    }, [])

    function getList() {
        GetOrderList().then(res => {
            res.data.result.forEach((v, i) => {
                v.key = i
            })
            setList(res.data.result)
        })
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '订单流水号',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '商店id',
            dataIndex: 'store_id',
            key: 'store_id',
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
            title: '总价格',
            dataIndex: 'money',
            key: 'money',
        },
        {
            title: '实际购买价格',
            dataIndex: 'actual_price',
            key: 'actual_price',
        },
        {
            title: '购物数量',
            dataIndex: 'num',
            key: 'num',
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                switch (text) {
                    case 0:
                        return <a>待支付</a>
                        break;
                    case 1:
                        return <a>代发货</a>
                        break;
                    case 2:
                        return <a>已发货</a>
                        break;
                    case 3:
                        return <a>已完成</a>
                        break;
                    default:
                        return <a>出错了</a>
                        break;
                }

            }
        },
        {
            title: '支付方式',
            dataIndex: 'payment_type',
            key: 'payment_type',
        },
        {
            title: '申请退款时间',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (text) => {
                let data = new Date(Number(text));
                return <span>{data.toLocaleString()}</span>
            }
        },
        {
            title: '操作时间',
            dataIndex: 'update_time',
            key: 'update_time',
            render: (text) => {
                let data = new Date(Number(text));
                return <span>{data.toLocaleString()}</span>
            }
        },
        {
            title: '修改',
            key: 'update',
            render: (text, record) => (
                <span>
                    <OrderSet obj={text} abc={(obj) => setOrder(obj)}>修改</OrderSet>
                </span>
            ),
        },
        {
            title: '删除',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="danger" onClick={() => delOrder(record)} style={{ marginLeft: '10px' }} >
                        删除
                    </Button>
                </span>
            ),
        },
    ];

    const data = list;

    function setOrder(obj) {
        let arr = [...list];
        arr.forEach(item => {
            if (item.id == obj.id) {
                item = obj;
            }
        })
        setList(arr);
        console.log(list);
    }

    // 删除
    function delOrder(record) {
        let data = { id: record.id }
        DelOrder(data).then((res) => {
            if (res.data.code == 200) {
                let arr = list.filter(item => {
                    return item.id != record.id;
                })
                setList(arr);
                message.success(res.data.msg);
            } else {
                message.info(res.data.msg);
            }
        })
    }

    function goAddOrder() {
        props.history.push('/order/addOrder');
    }

    return (
        <div className="app-container">
            <Search
                style={{ width: '200px', marginBottom: "10px" }}
                size='large'
                placeholder="输入内容搜索"
                onSearch={value => console.log(value)}
                enterButton />
            <Table columns={columns} dataSource={data} />
        </div >
    )
}

export default Order;
