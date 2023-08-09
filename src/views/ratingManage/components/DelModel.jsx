import React, { useState } from 'react';
import { Modal, Button, message } from "antd"
import { delrating } from '../../../api/ratingManage';
export default function DelModel(props) {
    let { data, children, onDel } = props
    let [visit, SetVisit] = useState(false)
    const handleOk = () => {
        delrating(data).then(res => {
            if (res.data.code === 200) {
                message.success("删除成功")
                onDel()
            } else {
                message.error("删除失败")
            }
            SetVisit(false)
        })
    }
    return (
        <>
            
            <Button onClick={() => { SetVisit(true) }} type='danger'>{children}</Button>
            <Modal
                visible={visit}
                onOk={handleOk}
                onCancel={() => { SetVisit(false) }}
            >
                <div>真的确定要删除这条评论吗???</div>
            </Modal>
        </>
    )
}