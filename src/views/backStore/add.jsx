import React from 'react';
import { Button, Form, Icon, Input, message } from 'antd';
import { addBackstock } from '@/api/backStore'
import TypingCard from '@/components/TypingCard'

export default class AddDelivery extends React.Component {
    state = {
        data: {
            user_id: 0,
            order_id: 0,
            reason: "",
            money: "",
            imgs: "https://pic.616pic.com/ys_img/00/04/81/7SZSw5ZtYi.jpg",
            create_time: "",
        }
    };
    handle = () => {
        addBackstock(this.state.data).then(res => {
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

                <TypingCard source={"添加退货订单数据"} />
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
                        <span>退货原因</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入退货原因"
                            onChange={(e) => { this.state.data.reason = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>凭证图片</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入凭证图片的链接"
                            defaultValue="https://pic.616pic.com/ys_img/00/04/81/7SZSw5ZtYi.jpg"
                            onChange={(e) => { this.state.data.imgs = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>退款金额</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="请输入退款金额"
                            onChange={(e) => { this.state.data.money = e.target.value }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>申请退款时间</span>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="申请退款时间"
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