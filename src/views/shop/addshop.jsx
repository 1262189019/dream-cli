import React, { useState } from 'react';
import { Form, Input, Button, AutoComplete, message } from 'antd';
import './shoplist.less';
import { addshop } from '../../api/shop';
import TypingCard from '@/components/TypingCard'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ // 使用一个对象来保存表单数据
    title: "",
    img: "",
    price: "",
    brand_id: "",
    special_price: "",
    is_special: "",
    store_id: "",
    category_id: "",
    spg_id: ""
  });

  const handleChange = (e, fieldName) => { // 表单字段改变时更新对应的表单数据
    const value = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      // 发送商品信息给后端API进行添加

      await addshop(formData);

      // 添加成功后，可进行一些提示或跳转等操作
      // console.log("商品添加成功");
      message.success('商品添加成功')
    } catch (error) {
      // 添加失败时的处理逻辑，可进行错误提示等操作
      console.error("商品添加失败", error);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 7 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div className="app-container" style={{ backgroundColor: "#fff" }}>
      <TypingCard source={"添加商品数据"} />
      <Form style={{ width: "400px", margin: "auto" }}>
        <Form.Item label="品牌id" className="common_margin">

          <Input value={formData.brand_id} onChange={(e) => handleChange(e, "brand_id")} />

        </Form.Item>

        <Form.Item label="标题" className="common_margin">

          <Input value={formData.title} onChange={(e) => handleChange(e, "title")} />

        </Form.Item>

        <Form.Item label="图片" hasFeedback className="common_margin">

          <Input value={formData.img} onChange={(e) => handleChange(e, "img")} />

        </Form.Item>

        <Form.Item label="价格" className="common_margin">

          <Input value={formData.price} onChange={(e) => handleChange(e, "price")} />

        </Form.Item>

        <Form.Item label="优惠后价格" className="common_margin">

          <Input value={formData.special_price} onChange={(e) => handleChange(e, "special_price")} />

        </Form.Item>

        <Form.Item label="商品优惠类型" className="common_margin">

          <Input value={formData.is_special} onChange={(e) => handleChange(e, "is_special")} placeholder="1是优惠商品 2是秒杀商品" />

        </Form.Item>

        <Form.Item label="店铺id" className="common_margin">

          <Input value={formData.store_id} onChange={(e) => handleChange(e, "store_id")} />

        </Form.Item>

        <Form.Item label="分类id" className="common_margin">

          <Input value={formData.category_id} onChange={(e) => handleChange(e, "category_id")} />

        </Form.Item>

        <Form.Item label="品类id" className="common_margin">

          <Input value={formData.spg_id} onChange={(e) => handleChange(e, "spg_id")} />

        </Form.Item>

        <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={handleSubmit}>
          添加
        </Button>

      </Form>
    </div>
  );
}

export default RegistrationForm;