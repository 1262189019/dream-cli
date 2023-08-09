import React, { useState } from 'react';
import { Button, Modal, Form, Input, Icon, message, Rate } from "antd"
import { updaterating } from "../../../api/ratingManage"
export default function FormModel(props) {
    // 传递参数:按钮中的文字/反馈函数/数据
    let { children, onOperate, data } = props
    // Modal 框子显示隐藏
    let [visit, setVisit] = useState(false)
    // 修改要修改的表单数据
    let [changeDate, setChange] = useState(data)
    // 修改评分
    let [val, setVal] = useState(data.rating)
    const handleOk = () => {
        updaterating(changeDate).then(res => {
            if (res.data.code === 200) {
                message.success("更新成功")
                setVisit(false)
            } else {
                message.error("更新错误")
            }
            onOperate(changeDate)
        }).catch(err => {
            message.error("更新错误")
        })
    }
    return (
        <div style={{ display: "inline-block" }}>
            <Button type="primary" onClick={() => { setVisit(true) }}>
                {children}
            </Button>
            <Modal
                visible={visit}
                onOk={() => { handleOk() }}
                onCancel={() => { setVisit(false) }}
            >
                <Form>
                    <Form.Item style={{ margin: "0" }}>
                        <span>id:</span>
                        <Input
                            prefix={<Icon type="user" />}
                            disabled={true}
                            defaultValue={data.id}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>产品id:</span>
                        <Input
                            prefix={<Icon type="user" />}
                            disabled={true}
                            defaultValue={data.sku_id}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>创建时间:</span>
                        <Input
                            prefix={<Icon type="user" />}
                            disabled={true}
                            defaultValue={data.create_time}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>评分:</span>
                        <Rate
                            value={val}
                            onChange={(value) => {
                                setVal(value)
                                setChange({
                                    ...changeDate,
                                    rating: value
                                })
                            }} />
      
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>买家评论:</span>
                        <Input
                            prefix={<Icon type="user" />}
                            defaultValue={data.comment}
                            onChange={e => {
                                setChange({
                                    ...changeDate,
                                    comment: e.target.value
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>商户id:</span>
                        <Input
                            prefix={<Icon type="user" />}
                            disabled={true}
                            defaultValue={data.store_id}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }}>
                        <span>用户id:</span>
                        <Input
                            prefix={<Icon type="user" />}
                            disabled={true}
                            defaultValue={data.customer_id}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
