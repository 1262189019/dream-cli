import React from 'react';
import { Modal, Button, Form, Icon, Input, message } from 'antd';
import { getAllVoucher, updateCustomer, delCustomer } from "@/api/coupon"

class setCoupon extends React.Component {
    list = []
    state = {
        ModalText: '修改优惠券信息',
        visible: false,
        confirmLoading: false,
        obj: {}
    };
    // 显示时执行
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    // 提交时执行
    handleOk = () => {
        console.log(this.props.data);
        console.log(this.state.obj);
        updateCustomer(this.state.obj).then(res => {
            if (res.data.code === 200) {
                this.props.update(this.state.obj)
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
        const { visible, confirmLoading, obj } = this.state;
        for (const key in data) {
            if (key === 'id') {
                obj['voucher_id'] = data[key]
            } else {
                obj[key] = data[key]
            }
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
                    <Form >
                        <Form.Item label="优惠卷金额" className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.deno = e.target.value} placeholder="必填:" defaultValue={data.deno} />
                        </Form.Item>
                        <Form.Item label="优惠卷满减使用" className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.condition_value = e.target.value} defaultValue={data.condition_value} />
                        </Form.Item>
                        <Form.Item label="优惠卷开始时间" hasFeedback className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.start_time = e.target.value} placeholder="必填:" defaultValue={data.start_time} />
                        </Form.Item>
                        <Form.Item label="优惠卷结束时间" className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.end_time = e.target.value} placeholder="必填:" defaultValue={data.end_time} />
                        </Form.Item>
                        <Form.Item label="店铺Id" className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.stroe_id = e.target.value} placeholder="选填:" defaultValue={data.stroe_id} />
                        </Form.Item>
                        <Form.Item label="产品Id" hasFeedback className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.spu_id = e.target.value} placeholder="选填:" defaultValue={data.spu_id} />
                        </Form.Item>
                        <Form.Item label="优惠卷说明" hasFeedback className='common_margin' style={{ margin: "0px" }}>
                            <Input onChange={(e) => obj.name = e.target.value} placeholder="选填:" defaultValue={data.name} />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default setCoupon