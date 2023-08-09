import React, { useEffect, useState } from 'react';
import { getBrand, delBrand } from '@/api/brand.js'
import { Table, Button, Input, message, Modal } from 'antd';
import App from "./setBrand";
const { confirm } = Modal;
const { Search } = Input;
const { Column } = Table;
const BrandPage = () => {
    let [list, setList] = useState([])
    useEffect(() => {
        getData();
    }, [])

    //获取列表数据
    async function getData() {
        let res = await getBrand()
        setList(res.data.data)
    }
    //设置更新后的数据以完成响应数据（未生效）
    function setObj(obj) {
        let arr = list;
        arr.forEach(item => {
            if (item.id == obj.id) {
                item = obj;
            }
        })
        setList(arr)
    }

    //删除
    const del = (row) => async () => {
        confirm({
            content: <p>确定删除此品牌吗？</p>,
            onOk() {
                delBrand(row.id).then(res => {
                    if (res.data.code === 200) {
                        message.success('删除成功')
                        let arr = list.filter(item => {
                            return item.id != row.id;
                        })
                        setList(arr)
                    } else
                        message.error('删除失败')
                })
            },
            onCancel() {
            },
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
            <Table dataSource={list} rowKey='id'>
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="品牌名" dataIndex="name" key="name" />
                <Column title="图片地址" dataIndex="image" key="image" />
                <Column title="操作" dataIndex="" key="update"
                    render={(row) => (
                        <>
                            <App row={row} abc={(obj) => setObj(obj)} Change={(item) => {
                                let newList = []
                                for (let i = 0; i < list.length; i++) {
                                    if (item.id === list[i].id) {
                                        newList.push(item)
                                    } else {
                                        newList.push(list[i])
                                    }
                                }
                                setList(newList)
                            }} ></App>
                        </>
                    )
                    }
                />
                <Column title="操作" dataIndex="" key="title"
                    render={(row) => (
                        <>
                            <Button type='danger' onClick={del(row)} style={{ marginLeft: '10px' }}>删除</Button>
                        </>
                    )
                    }
                />
            </Table >



        </div >
    );
}

export default BrandPage;