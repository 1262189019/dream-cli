import React from 'react'
import { addSwiper } from '../../api/swiper'
import { Form, Input, Button, message } from 'antd';
import TypingCard from '@/components/TypingCard'

const AddSwiper = (props) => {
    let data = {}

    function aSwiper() {
        // 添加订单
        addSwiper(data).then(async res => {
            console.log(res);
            if (res.data.code === 204) {
                props.history.push('/swiper/swiperlist');
                message.success(res.data.msg);
            } else {
                message.warning(res.data.msg);
            }
        })
    }

    function nSwiper() {
        props.history.push('/swiper/addswiper');
    }


    return (
        <div style={{ backgroundColor: "#fff" }}>
            <TypingCard source={"添加轮播图数据"} />
            < Form className="login-form" style={{ width: "400px", margin: "auto" }} >
                <Form.Item label="图片地址" >
                    <Input placeholder="必填:" id="" onChange={(e) => data.url = e.target.value} />
                </Form.Item>

                <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={aSwiper}>
                    添加
                </Button>
            </Form>

        </div >
    )
}
export default AddSwiper