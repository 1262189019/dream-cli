import React from 'react';
import { Button, Form, Icon, Input, message } from 'antd';
import { addDelivery } from '@/api/deliver'
import TypingCard from '@/components/TypingCard'

export default class AddDelivery extends React.Component {
    state = {
        data: {
            order_id: 0,
            postid: "",
            ecp: "",
            address: "",
            create_time: ""
        }
    };
    handle = () => {
        console.log(this.state.data);
        addDelivery(this.state.data).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    ModalText: 'The modal will be closed after two seconds',
                    confirmLoading: true,
                })
                setTimeout(() => {
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                    message.success("添加成功");
                }, 1000)
            } else {
                message.error('添加失败');
            }
        }).catch(err => {
            message.error('添加失败');
        })

    }

    render = () => {
        const container = {
            width: "100%",
            margin: "20px",
            display: "inline-block",
            backgroundColor: "#fff",
        }
        return (
            <div className="app-container" style={container}>

                <TypingCard source={"添快递数据"} />

                <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: "400px", margin: "auto" }}>
                    <Form.Item style={{ margin: "0" }}>
                        <span>订单ID</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入订单ID"
                            onChange={(e) => { this.state.data.order_id = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>快递单号</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入快递单号"
                            // disabled
                            // defaultValue={data.postid}
                            onChange={(e) => { this.state.data.postid = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>快递公司</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入快递公司"
                            // defaultValue={data.ecp}
                            onChange={(e) => { this.state.data.ecp = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>收货地址</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入收货地址"
                            // defaultValue={data.address}
                            onChange={(e) => { this.state.data.address = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>添加时间</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="添加时间"
                            // defaultValue={data.is_delete}
                            onChange={(e) => { this.state.data.create_time = e.target.value }}
                        />
                    </Form.Item>
                    <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={this.handle}>
                        添加
                    </Button>
                </Form>
            </div>
        );
    }
}