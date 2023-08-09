import React from 'react'
import { AddOrder } from '@/api/order.js'
import { Form, Input, Button, message } from 'antd';
import TypingCard from '@/components/TypingCard'
const addOrder = (props) => {
    let data = {}
    const cardContent = `此页面可以添加新的订单数据`

    function aOrder() {
        // 添加订单
        AddOrder(data).then(async res => {
            if (res.data.code === 200) {
                message.success(res.data.msg);
                props.history.push('/order/orderList');
            } else {
                message.info(res.data.msg);
            }
        })
    }

    function nOrder() {
        props.history.push('/order/orderList');
    }

    return (
        <div className="app-container" style={{ backgroundColor: "#fff" }}>
            <TypingCard source={cardContent} />
            <Form style={{ width: "400px", margin: "auto" }}>
                <Form.Item label="商店id" style={{ marginBottom: "0px" }} >
                    <Input placeholder="请输入商店id" id="" onChange={(e) => data.store_id = e.target.value} />
                </Form.Item>

                <Form.Item label="客户id" style={{ marginBottom: "0px" }}>
                    <Input placeholder="请输入客户id" id="warning" onChange={(e) => data.customer_id = e.target.value} />
                </Form.Item>

                <Form.Item label="商品id" style={{ marginBottom: "0px" }}>
                    <Input placeholder="请输入商品id" id="" onChange={(e) => data.sku_id = e.target.value} />
                </Form.Item>

                <Form.Item label="商品数量" style={{ marginBottom: "0px" }}>
                    <Input placeholder="请输入商品数量" id="success" onChange={(e) => data.num = e.target.value} />
                </Form.Item>

                <Form.Item label="总价格" style={{ marginBottom: "0px" }}>
                    <Input placeholder="请输入总价格" id="validating" onChange={(e) => data.money = e.target.value} />
                </Form.Item>

                <Form.Item label="实际购买价格" style={{ marginBottom: "0px" }}>
                    <Input placeholder="请输入实际购买价格" id="validating" onChange={(e) => data.actual_price = e.target.value} />
                </Form.Item>

                <Form.Item label="支付类型" help='1.微信，2.支付宝' style={{ marginBottom: "0px" }}>
                    <Input placeholder="请输入支付类型" id="success" onChange={(e) => data.payment_type = e.target.value} />
                </Form.Item>

                    <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={aOrder}>
                        添加
                    </Button>
            </Form>

        </div >
    )
}
export default addOrder
