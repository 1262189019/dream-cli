import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { addBrand } from '@/api/brand.js'
import TypingCard from '@/components/TypingCard'

class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      data: {}
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };

  //调用方法添加新数据
  handle = async () => {
    let res = await addBrand(this.state.data)
    console.log(res.data);
    if (res.data.code === 200) {
      message.success('添加成功')
      setTimeout(() => {
        this.props.history.push('/brand/brandList')
      }, 600)
    } else {
      message.error('添加失败')
    }
  }
  render() {
    return (
      <div className="app-container" style={{backgroundColor:"#fff"}}>
        <TypingCard source={"添加品牌数据"} />

        <Form onSubmit={this.handleSubmit} className="login-form" style={{ width: "400px", margin: "auto" }}>

          <Form.Item label="品牌名" style={{ margin: "0" }}>
            <Input
              placeholder="请输入品牌名"
              onChange={(e) => { this.state.data.name = e.target.value }}
            />
          </Form.Item>

          <Form.Item style={{ margin: "0" }} label="图片地址">
            <Input
              placeholder="请输入图片地址"
              onChange={(e) => { this.state.data.image = e.target.value }}
            />
          </Form.Item>

          <Form.Item style={{ margin: "0" }} label="首字母">
            <Input
              placeholder="请输入首字母"
              onChange={(e) => { this.state.data.letter = e.target.value }}
            />
          </Form.Item>

          <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={this.handle}>
            添加
          </Button>
        </Form>
      </div>
    );
  }
}

export default FormLayoutDemo
