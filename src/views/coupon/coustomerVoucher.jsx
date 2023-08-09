import React from 'react'
import { addCustomer } from '../../api/coupon'
import { Form, Input, Button, message } from 'antd';
import TypingCard from '@/components/TypingCard'



const addVoucher = (props) => {
    let data = {}

    function aVoucher() {
        console.log(data);
        // 添加订单
        addCustomer(data).then(async res => {
            console.log(res);
            if (res.data.code === 200) {
                message.success(res.data.msg);
                props.history.push('/coupon/voucher');
            } else {
                message.warning(res.data.msg);
            }
        })
    }

    function nVoucher() {
        props.history.push('/coupon/voucher');
    }


    return (
        <div className="app-container" style={{ backgroundColor: "#fff" }}>
            <TypingCard source={"添加品牌数据"} />

            < Form className="login-form" style={{ width: "400px", margin: "auto" }} >

                <Form.Item label="客户id"  style={{margin:"0px"}}>
                    <Input placeholder="必填:" id="" onChange={(e) => data.customer_id = e.target.value} />
                </Form.Item>

                <Form.Item label="优惠卷金额" style={{margin:"0px"}}>
                    <Input placeholder="必填:" id="warning" onChange={(e) => data.deno = e.target.value} />
                </Form.Item>

                <Form.Item label="优惠卷满减使用" style={{margin:"0px"}}>
                    <Input placeholder="必填:" id="" onChange={(e) => data.condition_value = e.target.value} />
                </Form.Item>

                <Form.Item label="优惠卷开始时间" style={{margin:"0px"}}>
                    <Input placeholder="必填:" id="success" onChange={(e) => data.start_time = e.target.value} />
                </Form.Item>

                <Form.Item label="优惠卷结束时间" style={{margin:"0px"}}>
                    <Input placeholder="必填:" id="validating" onChange={(e) => data.end_time = e.target.value} />
                </Form.Item>

                <Form.Item label="店铺Id" style={{margin:"0px"}}>
                    <Input placeholder="选填:" id="validating" onChange={(e) => data.store_id = e.target.value} />
                </Form.Item>

                <Form.Item label="产品Id" style={{margin:"0px"}}>
                    <Input placeholder="选填:" id="success" onChange={(e) => data.spu_id = e.target.value} />
                </Form.Item>
                <Form.Item label="优惠卷说明" style={{margin:"0px"}}>
                    <Input placeholder="选填:" id="success" onChange={(e) => data.name = e.target.value} />
                </Form.Item>

                <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={aVoucher}>
                    添加
                </Button>
            </Form>

        </div >
    )
}
export default addVoucher