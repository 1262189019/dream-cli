import React, { useEffect, useState } from 'react';
import { getStoreList, delStore } from "../../api/storeManage"
import { Table, Button, Modal, message, Input } from "antd"
import FormModel from './components/FormModel';
const { Search } = Input;

const StorePage = () => {
    // 用户数据列表
    let [storeList, setStoreList] = useState([])
    // 弹框是否显示
    let [visible, setVisible] = useState(false)
    // 确定时的loading效果
    let [confirmLoading, setLoading] = useState(false)
    // 需要提交的修改数据
    let [storeValue, setValue] = useState({})

    // 请求用户数据函数
    const getStore = async () => {
        let data = await getStoreList()
        let res = data.data.data
        res.forEach((v, i) => {
            v.address = v.address || "—"
            v.avatar = v.avatar || "—"
            v.desc = v.desc || "—"
            v.real_name = v.real_name || "—"
            v.region = v.region || "—"
            v.tel = v.tel || "—"
            v.key = i
            v.action = i
        })
        setStoreList(res)
        // console.log(data.data.data);
    }

    // 删除用户数据
    const delStoreList = async (data) => {
        let res = await delStore(data)
        if (res.data.code === 200) {
            setTimeout(() => {
                getStore()
                setLoading(false)
                setVisible(false)
                message.success('删除成功');
            }, 2000);
        } else {
            message.error('删除出错');
        }
    }

    // 弹框点击确定
    const handleOk = () => {
        // 调用删除事件
        delStoreList({ id: storeValue.id })
        // 延迟关闭
        setLoading(true)
    }
    // 弹框点击取消关闭
    const handleCancel = () => {
        setVisible(false)
    }

    // 点击删除函数
    const deleteInfo = (item) => {
        // 修改弹框内容(修改/删除)
        // setModel(false)
        // 展示弹框
        setVisible(true)
    }

    const onChangeOk = (item) => {
        let data = []
        for (let i = 0; i < storeList.length; i++) {
            if (item.id === storeList[i].id) {
                item.key = i
                item.action = i
                data.push(item)
            } else {
                data.push(storeList[i])
            }
        }
        setStoreList(data)
    }

    // 初始化获取用户数据
    useEffect(() => {
        getStore()
    }, [])
    // table表头 
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '店铺名字',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '店铺密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '店铺地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '店铺Logo',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: '店铺介绍',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '店主名字',
            dataIndex: 'real_name',
            key: 'real_name' || "无",
        },
        {
            title: '住址',
            dataIndex: 'region',
            key: 'region',
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: '修改',
            key: "num",
            render(item) {
                return (
                    <>
                        <FormModel onChangeOk={onChangeOk} storeInfo={item}>修改</FormModel>
      
                    </>
                )
            }
        },
        {
            title: '删除',
            key: "del",
            render(item) {
                return (
                    <>
                        <Button onClick={() => {
                            setValue(item)
                            // 删除数据函数
                            deleteInfo(item)
                        }} type="danger">删除</Button>
                    </>
                )
            }
        },
    ];
    return (
        <div className="app-container">
            <Search
                style={{ width: '200px', marginBottom: "10px" }}
                size='large'
                placeholder="输入内容搜索"
                onSearch={value => console.log(value)}
                enterButton />
            {/* 删除数据弹出层 */}
            <Modal
                title={"删除用户数据"}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {<div>真的要删除用户数据吗？？？</div>}</Modal>
            {/* 数据列表 */}
            <Table dataSource={storeList} columns={columns} />
        </div>
    )
}

export default StorePage 