import React, { useState } from 'react';
import { Form, Input, Button, AutoComplete,message} from 'antd';
import './shoplist.less';
import { addtshop } from '../../api/shop';
import TypingCard from '@/components/TypingCard'


const RegistrationForm = () => {
  const [formData, setFormData] = useState({ // 使用一个对象来保存表单数据
    title: "",
    spu_id:"",
    imgs: "",
    price: "",
    param: "",
    stock: "",
    desc_pc: "",
    desc_app: "",
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

      await addtshop(formData);

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

      <Form.Item label="标题" className="common_margin">
      
          <Input value={formData.title} onChange={(e) => handleChange(e, "title")} />
     
      </Form.Item>

      <Form.Item label="图片" hasFeedback className="common_margin">
      
          <Input value={formData.imgs} onChange={(e) => handleChange(e, "imgs")} />
     
      </Form.Item>
      <Form.Item label="产品id" className="common_margin">
       
       <Input value={formData.spu_id} onChange={(e) => handleChange(e, "spu_id")} />

   </Form.Item>

      <Form.Item label="价格" className="common_margin">
      
          <Input value={formData.price} onChange={(e) => handleChange(e, "price")} />
    
      </Form.Item>

   

      <Form.Item label="产品参数" className="common_margin">
       
          <Input value={formData.param} onChange={(e) => handleChange(e, "param")} />
        
      </Form.Item>

      <Form.Item label="股票" className="common_margin">
       
          <Input value={formData.stock} onChange={(e) => handleChange(e, "stock")} />
      
      </Form.Item>

      <Form.Item label="电脑端商品详情" className="common_margin">
       
          <Input value={formData.desc_pc} onChange={(e) => handleChange(e, "desc_pc")} />
      
      </Form.Item>

      <Form.Item label="移动端商品详情" className="common_margin">
       
          <Input value={formData.desc_app} onChange={(e) => handleChange(e, "desc_app")} />
    
      </Form.Item>


      <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={handleSubmit}>
                    添加
                </Button>
    </Form>
    </div>
  );
}

export default RegistrationForm;