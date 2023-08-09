import React from 'react';
import { Modal, Button, Form, Icon, Input, message } from 'antd';
import { setBackstock } from '@/api/backStore'
export default class SetBack extends React.Component {
    list = []
    state = {
        ModalText: '修改快递信息',
        visible: false,
        confirmLoading: false,
        backInfo: {}
    };
    // 显示时执行
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 提交时执行
    handleOk = () => {
        this.props.update(this.state.backInfo)
        setBackstock(this.state.backInfo).then(res => {
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
                    message.success('修改成功');
                }, 1000)
            }
        }).catch(err => {
            message.error('修改出错');
        })
    };

    // 取消时执行
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render = () => {
        // 自定义参数
        let { children, data } = this.props

        const { visible, confirmLoading, backInfo } = this.state;
        for (const key in data) {
            backInfo[key] = data[key]
        }
        return (
            <div style={{ display: "inline-block" }}>
                <Button type="primary" onClick={this.showModal}>
                    {children}
                </Button>
                <Modal
                    title="修改退货信息"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item style={{ margin: "0" }}>
                            <span>Id</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入ID"
                                disabled
                                defaultValue={data.id}
                                onChange={(e) => { backInfo.id = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>订单id</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入订单id"
                                disabled
                                defaultValue={data.order_id}
                                onChange={(e) => { backInfo.order_id = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>申请退款时间</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="申请退款时间"
                                disabled
                                defaultValue={data.create_time}
                                onChange={(e) => { backInfo.create_time = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>操作时间</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入操作时间"
                                defaultValue={data.update_time}
                                onChange={(e) => { backInfo.update_time = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>处理状态(1.待处理,2.处理中,3.完成)</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="快递是否收货"
                                defaultValue={data.status}
                                onChange={(e) => { backInfo.status = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>退货原因</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入退货原因"
                                defaultValue={data.reason}
                                onChange={(e) => { backInfo.reason = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>退款金额</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入退款金额"
                                defaultValue={data.money}
                                onChange={(e) => { backInfo.money = e.target.value }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}