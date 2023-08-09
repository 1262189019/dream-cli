import React from 'react';
import { Modal, Button, Form, Icon, Input, message } from 'antd';
import { updateStore } from "../../../api/storeManage"
export default class App extends React.Component {
    state = {
        ModalText: '修改商户信息',
        visible: false,
        confirmLoading: false,
        data: {}
    };
    // 显示时执行
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 提交时执行
    handleOk = () => {
        updateStore(this.state.data).then(res => {
            if (res.data.code === 200) {
                this.props.onChangeOk(this.state.data)
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
        let { children, storeInfo } = this.props
        const { visible, confirmLoading, data } = this.state;
        data.id = storeInfo.id
        data.name = storeInfo.name
        data.password = storeInfo.password
        data.address = storeInfo.address
        data.avatar = storeInfo.avatar
        data.desc = storeInfo.desc
        data.real_name = storeInfo.real_name
        data.region = storeInfo.region
        data.tel = storeInfo.tel
        return (
            <div style={{ display: "inline-block" }}>
                <Button type="primary" onClick={this.showModal}>
                    {children}
                </Button>
                <Modal
                    title="修改用户信息"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form className="login-form">
                        <Form.Item style={{ margin: "0" }}>
                            <span>id:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                disabled={true}
                                defaultValue={storeInfo.id}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>店铺名称:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.name}
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>店铺密码:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.password}
                                onChange={(e) => {
                                    data.password = e.target.value
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>店铺地址:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.address}
                                onChange={(e) => {
                                    data.address = e.target.value
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>店铺logo:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.avatar}
                                onChange={(e) => {
                                    data.avatar = e.target.value
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>店铺介绍:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.desc}
                                onChange={(e) => {
                                    data.desc = e.target.value
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>真实名字:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.real_name}
                                onChange={(e) => data.real_name = e.target.value}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>居住地址:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.region}
                                onChange={(e) => {
                                    data.region = e.target.value
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>联系电话:</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                defaultValue={storeInfo.tel}
                                onChange={(e) => {
                                    data.tel = e.target.value
                                }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}