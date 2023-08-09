import React from 'react';
import { Modal, Button, Form, Icon, Input, message } from 'antd';
import { updateDelivery } from '@/api/deliver'
export default class SetDelivery extends React.Component {
    list = []
    state = {
        ModalText: '修改快递信息',
        visible: false,
        confirmLoading: false,
        deliveryInfo: {}
    };
    // 显示时执行
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 提交时执行
    handleOk = () => {
        console.log(this.state.deliveryInfo);
        this.props.update(this.state.deliveryInfo)
        updateDelivery(this.state.deliveryInfo).then(res => {
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

        const { visible, confirmLoading, deliveryInfo } = this.state;
        for (const key in data) {
            deliveryInfo[key] = data[key]
        }
        return (
            <div style={{ display: "inline-block" }}>
                <Button type="primary" onClick={this.showModal}>
                    {children}
                </Button>
                <Modal
                    title="修改快递信息"
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
                                onChange={(e) => { deliveryInfo.id = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>快递单号</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入快递单号"
                                disabled
                                defaultValue={data.postid}
                                onChange={(e) => { deliveryInfo.postid = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>快递公司</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入快递公司"
                                defaultValue={data.ecp}
                                onChange={(e) => { deliveryInfo.ecp = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>收货地址</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入收货地址"
                                defaultValue={data.address}
                                onChange={(e) => { deliveryInfo.address = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>快递是否收货(0未收货/1收货)</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="快递是否收货"
                                defaultValue={data.is_delete}
                                onChange={(e) => { deliveryInfo.is_delete = e.target.value }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}