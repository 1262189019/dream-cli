import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  AutoComplete,
} from 'antd';
import './shoplist.less'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const [title, setTitle] = useState("");
const [imgs, setImgs] = useState("");
const [price, setPrice] = useState("");
const [brand_id, setbrand_id] = useState("")
const [special_price, setspecial_price] = useState("")
const [is_special, setis_special] = useState("")
const [store_id, setstore_id] = useState("")
const [category_id, setcategory_id] = useState("")
const [spg_id, setspg_id] = useState("")


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };


  render() {
    const { autoCompleteResult } = this.state;

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

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <div className="app-container" style={{ backgroundColor: "#fff" }}>
        <TypingCard source={"添加商品数据"} />
        <Form style={{ width: "400px", margin: "auto" }}>

          <Form.Item label="品牌id" className='common_margin'>
            <AutoComplete
              // dataSource={websiteOptions}
              // onChange={this.handleWebsiteChange}
              placeholder="请输入品牌id"
            >
              <Input value={brand_id} onChange={(e) => setbrand_id(e.target.value)} />
            </AutoComplete>
          </Form.Item>

          <Form.Item label="标题" className='common_margin'>
            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入标题"
            >
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </AutoComplete>
          </Form.Item>
          <Form.Item label="图片" hasFeedback className='common_margin'>
            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入图片"
            >
              <Input value={imgs} onChange={(e) => setImgs(e.target.value)} />
            </AutoComplete>
          </Form.Item>

          <Form.Item label="价格" className='common_margin'>
            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入价格"
            >
              <Input value={price} onChange={(e) => setPrice(e.target.value)} />
            </AutoComplete>
          </Form.Item>
          <Form.Item label="优惠后价格" className='common_margin'>

            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入优惠后价格"
            >
              <Input value={special_price} onChange={(e) => setspecial_price(e.target.value)} />
            </AutoComplete>
          </Form.Item>

          <Form.Item label="商品优惠类型" className='common_margin'>

            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入商品优惠类型(1:优惠商品,2:秒杀商品)"
            >
              <Input value={is_special} onChange={(e) => setis_special(e.target.value)} />
            </AutoComplete>
          </Form.Item>

          <Form.Item label="店铺id" className='common_margin'>

            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入店铺id"
            >
              <Input value={store_id} onChange={(e) => setstore_id(e.target.value)} />
            </AutoComplete>
          </Form.Item>


          <Form.Item label="分类id" className='common_margin'>

            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入分类id"
            >
              <Input value={category_id} onChange={(e) => setcategory_id(e.target.value)} />
            </AutoComplete>
          </Form.Item>

          <Form.Item label="品类id" className='common_margin'>

            <AutoComplete
              dataSource={websiteOptions}
              placeholder="请输入品类id"
            >
              <Input value={spg_id} onChange={(e) => setspg_id(e.target.value)} />
            </AutoComplete>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RegistrationForm