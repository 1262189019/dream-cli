import React from 'react';
import { Addshopcar, DeleteShopCar } from '@/api/shopcar.js'
import { Modal, Button, Form,  Input, message, AutoComplete, Select } from 'antd';
const { Option } = Select;
export default class App extends React.Component {
  state = {
    ModalText: '修改用户信息',
    visible: false,
    confirmLoading: false,
    shopInfo: {},
    isShow: false,
    isToggle:true
  };
  // 显示时执行
  showModal = (count) => {
    if (count === 1) {
      this.setState({ visible: true, isShow: true })
    }
    if (count === 2) {
      this.setState({ visible: true })
    }
  };


  // 提交时执行
  handleOk = () => {
    let { id, title, img, type, price, stock, customer_id, sku_id, num, dftype } = this.state.shopInfo
    let params = [{ title, img, price, type, stock }]
    params = JSON.stringify(params)
    let obj = { id, customer_id, sku_id, num, params, dftype }
    if (this.state.isShow) {
      Addshopcar(obj).then(r => {
        if (r.data.code === 200) {
          this.setState({
            visible: false,
          });
          setTimeout(() => {
            this.setState({
              isShow: false
            });
          }, 200)
        }
        this.props.handlerClickDb({ sku_id, customer_id, num, params, dftype }, 'update')
        message.success('change is a success');
      })
    }


    if (this.state.isShow === false) {
      DeleteShopCar({ sku_id, customer_id }).then(res => {
        if (res.data.code === 200) {
          this.setState({
            visible: false,
            isShow: false
          });
          this.props.handlerClickDb({ sku_id, customer_id }, 'del')
        }
        message.success('delete is a success');
      })
    }

  };

  // 取消时执行
  handleCancel = () => {
    this.setState({
      visible: false
    });
    if (this.state.isShow) {
      setTimeout(() => {
        this.setState({
          isShow: false
        });
      }, 200)
    }
  };




  render = () => {
    let { data } = this.props
    if(data==='undefined'){
       this.setState({
        isToggle:false
       })
    }
    const { visible, confirmLoading, shopInfo } = this.state;
    Object.keys(data).forEach(i=>shopInfo[i]=data[i])
    return (
     this.state.isToggle? <div style={{ display: 'flex', justifyContent: 'space-around', width: '150px' }}>
      <Button type="primary" onClick={() => this.showModal(1)}>
        编辑
      </Button>
      <Button type="primary" onClick={() => this.showModal(2)}>
        删除
      </Button>
      <Modal
        title="修改用户信息"
        visible={visible}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
      >

        {
          this.state.isShow ? <Form onSubmit={(e) => this.handSubmit(e)}>
            <Form.Item label="客户id" className='common_margin'>
              <AutoComplete
                disabled={true}
                defaultValue={shopInfo.customer_id + ''}
              >
                <Input />
              </AutoComplete>
            </Form.Item>

            <Form.Item label="商品id" className='common_margin'>
              <AutoComplete
                disabled={true}
                defaultValue={shopInfo.sku_id + ''}
              >
                <Input />
              </AutoComplete>
            </Form.Item>
            <Form.Item label="商品标题" hasFeedback className='common_margin'>
              <AutoComplete
                disabled={true}
                defaultValue={shopInfo.title}

              >
                <Input />
              </AutoComplete>
            </Form.Item>

            <Form.Item label="价格" className='common_margin'>
              <AutoComplete
                defaultValue={shopInfo.price + ''}
                disabled={true}
              >
                <Input />
              </AutoComplete>
            </Form.Item>

            <Form.Item label="商品数量" className='common_margin'>
              <AutoComplete
                defaultValue={shopInfo.num + ''}
                onChange={(value) => {
                  shopInfo.num = value
                }}
              >
                <Input />
              </AutoComplete>
            </Form.Item>


            <Form.Item label="类型" className='common_margin'>
              <Select mode="select" placeholder="Please select favourite colors" defaultValue={shopInfo.dftype} onChange={(value) => {
                shopInfo.dftype = value
              }} >
                {
                  shopInfo.type.map((item, index) => {
                    return <Option value={item} key={index}>{item}</Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form> : <div>确定删除?</div>
        }


      </Modal>
    </div>:<div>购物车数据为空</div>
    
    );
  }
}


