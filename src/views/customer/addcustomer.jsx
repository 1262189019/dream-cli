import React, { useState } from 'react';
import { Form, Input, Button, AutoComplete, message } from 'antd';
import './customer.less';
import { register } from '../../api/customer';
import TypingCard from '@/components/TypingCard'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ // 使用一个对象来保存表单数据
    username: "",
    password: "",
    email: "",
    tel: "",
    nickname: "",
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

      await register(formData);

      // 添加成功后，可进行一些提示或跳转等操作
      // console.log("商品添加成功");
      message.success('注册成功')
    } catch (error) {
      // 添加失败时的处理逻辑，可进行错误提示等操作
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
      <TypingCard source={"添加客户数据"} />
      <Form className="login-form" style={{ width: "400px", margin: "auto" }}>

        <Form.Item label="账号" className="common_margin">
          <Input value={formData.username} onChange={(e) => handleChange(e, "username")} placeholder="1-16位字母/数字/下划线" />
        </Form.Item>

        <Form.Item label="密码" className="common_margin">

          <Input.Password value={formData.password} onChange={(e) => handleChange(e, "password")} placeholder="1-12位数字" />

        </Form.Item>

        <Form.Item label="邮箱" hasFeedback className="common_margin">

          <Input value={formData.email} onChange={(e) => handleChange(e, "email")} />

        </Form.Item>

        <Form.Item label="手机号" className="common_margin">

          <Input value={formData.tel} onChange={(e) => handleChange(e, "tel")} placeholder="可选" />

        </Form.Item>

        <Form.Item label="昵称" className="common_margin">

          <Input value={formData.nickname} onChange={(e) => handleChange(e, "nickname")} />

        </Form.Item>

          <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={handleSubmit}>
            添加
          </Button>
      </Form>
    </div>
  );
}

export default RegistrationForm;
