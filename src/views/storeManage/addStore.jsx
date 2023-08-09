import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { addStoreList } from "../../api/storeManage"
import TypingCard from '@/components/TypingCard'

export default class addStore extends React.Component {
    state = {
        data: {
            name: "",
            password: "",
            address: "",
            avatar: "",
            desc: "",
            real_name: "",
            region: "",
            tel: ""
        }
    }
    // 提交触发
    handleOk = () => {
        addStoreList(this.state.data).then(res => {
            console.log(res.data.code)
            if (res.data.code === 201) {
                message.success('添加成功,正在跳转....');
                setTimeout(() => {
                    this.props.history.push("/storeManage/storePage")
                }, 1000)
            } else {
                message.error('添加出错');
            }
        }).catch(err => {
            message.error('添加出错');
        })
    }
    render() {
        // 提交时候
        const { data } = this.state
        return (
            <div style={{ backgroundColor: "#fff" }}>
                   <TypingCard source={"添加店铺信息"} />
                < Form className="login-form" style={{ width: "400px", margin: "auto" }} >
                    <Form.Item style={{ margin: "0" }} label="店铺名称">
                        <Input
                            onChange={(e) => {
                                data.name = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }} label="店铺密码">
                        <Input
                            onChange={(e) => {
                                data.password = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="店铺地址" style={{ margin: "0" }}>
                        <Input
                            onChange={(e) => {
                                data.address = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="店铺logo" style={{ margin: "0" }}>
                        <Input
                            onChange={(e) => {
                                data.avatar = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="店铺介绍" style={{ margin: "0" }}>
                        <Input
                            onChange={(e) => {
                                data.desc = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="真实名字" style={{ margin: "0" }}>
                        <Input
                            onChange={(e) => data.real_name = e.target.value}
                        />
                    </Form.Item>
                    <Form.Item label="居住地址" style={{ margin: "0" }}>
                        <Input
                            onChange={(e) => {
                                data.region = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="联系电话" style={{ margin: "0" }}>
                        <Input
                            onChange={(e) => {
                                data.tel = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={this.handleOk}>
                        添加
                    </Button>
                </Form >

            </div>
        );
    }
}

