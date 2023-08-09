import React from 'react';
import { updateCategory } from '@/api/sortmanage.js'
import { Modal, Button, Form, Input, message } from 'antd';
export default class SetSortmanage extends React.Component {
    state = {
        ModalText: '修改用户信息',
        visible: false,
        confirmLoading: false,
    };

    // 显示时执行
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 取消时执行
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render = () => {
    
        console.log(updateCategory);
        // 自定义参数
        let { children, obj } = this.props
        console.log(obj);
        const { visible, confirmLoading } = this.state;

        let dataObj = obj;

        // 提交时执行
        let handleOk = () => {
            this.setState({
                ModalText: 'The modal will be closed after two seconds',
                confirmLoading: true,
            })
            updateCategory(dataObj).then(res => {
                if (res.data.code == 201) {
                    this.props.updata(dataObj);
                    message.success(res.data.msg);
                } else {
                    message.info(res.data.msg);
                }
            })
            setTimeout(() => {
                this.setState({
                    visible: false,
                    confirmLoading: false,
                });
            }, 1000)

        };
        return (
            <div style={{ display: "inline-block" }}>
                <Button type="primary" onClick={this.showModal}>
                    {children}
                </Button>
                <Modal
                    title="修改用户信息"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form>
                        <Form.Item label="订单id" style={{ marginBottom: "0px" }} >
                            <Input placeholder="parentName" defaultValue={obj.parent_name} onChange={e => { dataObj.parentName = e.target.value }} />
                        </Form.Item>
                        <Form.Item label="订单id" style={{ marginBottom: "0px" }} >
                            <Input placeholder="secondName" defaultValue={obj.name} onChange={e => { dataObj.secondName = e.target.value }} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}