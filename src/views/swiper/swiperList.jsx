import React, { useState, useEffect, useRef } from "react";
import { swiperList, updateSwiper, delSwiper } from '../../api/swiper'
import { Table, Modal, Button, Form, Input, message } from 'antd';
import './swiper.css'
const { Search } = Input;

const SwiperList = () => {
    let [arr, setArr] = useState([])
    let [val, setVal] = useState(null)
    let [sId, setSSId] = useState(null)
    useEffect(() => {
        swiperList().then(res => {
            res.data.data.forEach((v, i) => {
                v.key = i
            })
            setArr(res.data.data)
        })
    }, [])

    let [objId, setID] = useState(null)
    const columns = [
        {
            title: '图片ID',
            dataIndex: 'id',
            key: "id"
        },
        {
            title: '图片',
            dataIndex: 'imgsrc',
            key: 'swiperImg',
            render: (text, record) => {
                return <img src={record.swiperImg} alt="图片" style={{ borderRadius: "0px", height: "50px" }} />
            }
        },
        {
            title: '图片地址',
            key: 'imgsrc',
            width:"600px",
            render: (text, record) => {
                return <span >{record.swiperImg}</span>
            }
        },
        {
            title: '修改',
            render: (text, record) => {
                return (
                    <div>
                        <Button type="primary" onClick={() => showModalOne(record)} style={{ marginRight: '20px' }}>修改</Button>
                    </div>
                )
            }
        },
        {
            title: '删除',
            render: (text, record) => {
                return (
                    <div>
                        <Button type="danger" onClick={() => showModalTwo(record)}>删除</Button>
                    </div>
                )
            }
        },

    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };


    let obj = {}
    let [visibleOne, setVisibleOne] = useState(false)
    let [visibleTwo, setVisibleTwo] = useState(false)

    const showModalOne = (e) => {
        setVisibleOne(true)
        setID(e.id)
    };

    const showModalTwo = (e) => {
        setVisibleTwo(true)
        setSSId(e.id)
    };

    const handleOneOk = (record) => {
        obj.id = objId;
        obj.url = val;
        if (!val) {
            message.warning('请输入正确的参数');
        }
        if (val) {
            updateSwiper(obj).then(res => {
                if (res.data.code == 204) {
                    message.success('修改成功');
                    setVal(null)
                    setVisibleOne(false);
                    swiperList().then(res => {
                        setArr(res.data.data)
                    })
                }
            })
        }
        // setVisibleOne(false);
    }
    const handleTwoOk = (e) => {
        delSwiper(sId).then(res => {
            if (res.data.code == 204) {
                setVisibleTwo(false);
                message.success('删除成功');
                swiperList().then(res => {
                    setArr(res.data.data)
                })
            }
        })
        setVisibleOne(false);
    }
    const handleCancelOne = e => {
        setVisibleOne(false);

    };
    const handleCancelTwo = e => {
        setVisibleTwo(false);
        message.info('取消成功');
    };

    return (
        <div className="app-container">
        <Search
            style={{ width: '200px', marginBottom: "10px" }}
            size='large'
            placeholder="输入内容搜索"
            onSearch={value => console.log(value)}
            enterButton />
            <Table columns={columns} dataSource={arr} />,
            <Modal
                title="修改swiper"
                visible={visibleOne}
                onOk={handleOneOk}
                onCancel={handleCancelOne}
            >
                <Form >
                    <Form.Item label="swiper地址" className='common_margin'>
                        <Input value={val} onChange={(e) => {
                            obj.url = e.target.value;
                            setVal(e.target.value);
                        }} placeholder="必填:" />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="删除swiper"
                visible={visibleTwo}
                onOk={handleTwoOk}
                onCancel={handleCancelTwo}
            >
                <p>是否删除swiper?</p>
            </Modal>
        </div>
    )
}
export default SwiperList