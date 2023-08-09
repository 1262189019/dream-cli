import React from 'react';
import { SetOrder } from '@/api/order.js'
import { Modal, Button, Form, Input, message } from 'antd';
export default class App extends React.Component {

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
        // 自定义参数
        let { children, obj } = this.props
        const { visible, confirmLoading } = this.state;

        let dataObj = obj;

        // 提交时执行
        let handleOk = () => {
            this.props.abc(dataObj);
            this.setState({
                ModalText: 'The modal will be closed after two seconds',
                confirmLoading: true,
            })
            SetOrder(dataObj).then(res => {
                if (res.data.code == 200) {
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
                            <Input defaultValue={obj.id} id="" onChange={(e) => dataObj.id = e.target.value} disabled={true} />
                        </Form.Item>
                        <Form.Item label="商店id" style={{ marginBottom: "0px" }}>
                            <Input placeholder="请输入商店id" defaultValue={obj.store_id} disabled={true} id="" onChange={(e) => dataObj.store_id = e.target.value} />
                        </Form.Item>

                        <Form.Item label="客户id" style={{ marginBottom: "0px" }}>
                            <Input placeholder="请输入客户id" defaultValue={obj.customer_id} id="warning" disabled={true} onChange={(e) => dataObj.customer_id = e.target.value} />
                        </Form.Item>

                        <Form.Item label="商品id" style={{ marginBottom: "0px" }}>
                            <Input placeholder="请输入客品id" defaultValue={obj.sku_id} id="warning" onChange={(e) => dataObj.sku_id = e.target.value} />
                        </Form.Item>

                        <Form.Item label="订单状态" help='订单状态（0.待支付,1.代发货,2.已发货,3.已完成）' style={{ marginBottom: "0px" }}>
                            <Input placeholder="订单状态" defaultValue={obj.status} id="validating" onChange={(e) => dataObj.status = e.target.value} />
                        </Form.Item>

                        <Form.Item label="总价格" style={{ marginBottom: "0px" }}>
                            <Input placeholder="请输入总价格" defaultValue={obj.money} id="validating" onChange={(e) => dataObj.money = e.target.value} />
                        </Form.Item>

                        <Form.Item label="实际购买价格" style={{ marginBottom: "0px" }}>
                            <Input placeholder="请输入实际购买价格" defaultValue={obj.actual_price} id="validating" onChange={(e) => dataObj.actual_price = e.target.value} />
                        </Form.Item>

                        <Form.Item label="商品数量" style={{ marginBottom: "0px" }}>
                            <Input placeholder="请输入商品数量" defaultValue={obj.num} id="validating" onChange={(e) => dataObj.num = e.target.value} />
                        </Form.Item>

                        <Form.Item label="支付类型" help='1.微信，2.支付宝'>
                            <Input placeholder="请输入支付类型" defaultValue={obj.payment_type} id="success" onChange={(e) => dataObj.payment_type = e.target.value} />
                        </Form.Item>

                    </Form>
                </Modal>
            </div>
        );
    }
}