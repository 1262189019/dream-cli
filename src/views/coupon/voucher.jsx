import React, { useEffect, useState } from "react";
import { getAllVoucher, updateCustomer, delCustomer } from "../../api/coupon"
import { Table, Input, Popconfirm, message, Button } from 'antd';
import SetCoupon from './setCoupon'
import './voucher.css'
const { Search } = Input;

const Voucher = () => {
    let [arr, setArr] = useState([]);
    useEffect(() => {
        getAllVoucher().then(res => {
            res.data.result.forEach((v, i) => {
                v.key = i
            })
            setArr(res.data.result)
        })
    }, [])
    const columns = [
        {
            title: '客户Id',
            dataIndex: 'customer_id',
            keyL: 'customer_id'
        },
        {
            title: '优惠卷Id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '优惠卷金额',
            dataIndex: 'deno',
            key: 'deno'
        },
        {
            title: '优惠卷满减使用',
            dataIndex: 'condition_value',
            key: 'condition_value'
        },
        {
            title: '优惠卷开始时间',
            dataIndex: 'start_time',
            key: 'start_time'
        },
        {
            title: '优惠卷结束时间',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: '店铺Id',
            dataIndex: 'store_id',
            key: 'store_id'
        },
        {
            title: '商品Id',
            dataIndex: 'spu_id',
            key: 'spu_id'
        },
        {
            title: '优惠卷说明',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '修改',
            key: "update",
            render: (record) => {
                return <span><SetCoupon data={record} update={(data => {
                    let newArr = []
                    for(let i = 0; i < arr.length; i++){
                        newArr.push(arr[i])
                    }
                    setArr(newArr)
                })}>修改</SetCoupon></span>
            }
        },
        {
            title: '删除',
            key: "del",
            render: (text, record) => {
                return (
                    <span>
                        <Popconfirm
                            title="确定删除此优惠卷吗?"
                            onConfirm={() => confirm(record)}
                            onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type='danger'>删除</Button>
                        </Popconfirm>,
                    </span>
                );
            }
        },
    ];


    function confirm(e) {
        delVoucher(e)
        message.success('删除成功');

    }

    function cancel(e) {
        message.info('取消成功');
    }
    let obj = {}
    const delVoucher = (record) => {
        delCustomer(record.id).then(res => {
            if (res.data.code == 200) {
                getAllVoucher().then(res => {
                    message.success('删除成功');
                    setArr(res.data.result);
                });
            } else {
                message.error("删除失败")
            }

        })
    }



    return (
        <div className="app-container">
            <Search
                style={{ width: '200px', marginBottom: "10px" }}
                size='large'
                placeholder="输入内容搜索"
                onSearch={value => console.log(value)}
                enterButton />
            <Table columns={columns} dataSource={arr} />
        </div>
    );

}
export default Voucher 