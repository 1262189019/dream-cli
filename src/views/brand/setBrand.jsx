import React from 'react';
import { Modal, Button, Form, Icon, Input, message } from 'antd';
import { updateBrand } from '@/api/brand'

export default class App extends React.Component {

    state = {
        ModalText: '修改品牌信息',
        visible: false,
        confirmLoading: false,
        brandInfo: {},
        fuc: null,
    };

    // 提交时执行
    handleOk = async () => {
        let res = await updateBrand(this.state.brandInfo)
        if (res.data.code === 200) {
            this.state.fuc(this.state.brandInfo)
            message.success('修改成功')
            this.props.Change(this.state.brandInfo)
            this.setState({
                visible: false,
            });
        } else {
            message.success('修改失败')
        }
    };

    // 显示时执行
    showModal = () => {
        this.state.visible = true;
        this.setState({
            visible: true
        })
    };
    // 取消时执行
    handleCancel = () => {
        this.setState({
            visible: false
        })
    };



    render() {
        // 自定义参数
        let { row, abc } = this.props
        this.state.fuc = abc;
        const { visible, confirmLoading } = this.state;

        // console.log(row);
        this.state.brandInfo = row;

        return (
            <div style={{ display: "inline-block" }}>
                <Button type='primary' onClick={this.showModal}>编辑</Button>
                <Modal
                    title="修改品牌信息"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item style={{ margin: "0" }}>
                            <span>ID</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="ID"
                                disabled={true}
                                defaultValue={row.id}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>品牌名</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="brandName"
                                defaultValue={row.name}
                                onChange={(e) => {
                                    this.state.brandInfo.name = e.target.value
                                    console.log(this.state.brandInfo);
                                }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>图片地址</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="imgUrl"
                                defaultValue={row.image}
                                onChange={(e) => { this.state.brandInfo.image = e.target.value }}
                            />
                        </Form.Item>
                        <Form.Item style={{ margin: "0" }}>
                            <span>首字母</span>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="letter"
                                defaultValue={row.letter}
                                onChange={(e) => { this.state.brandInfo.letter = e.target.value }}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}