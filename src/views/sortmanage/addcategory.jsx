import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { addCategory } from '../../api/sortmanage.js'
import TypingCard from '@/components/TypingCard'

export default class addStore extends React.Component {
    state = {
        data: {
            parentName: "",
            secondName: "",
        }
    }
    // 提交触发
    handleOk = () => {
        addCategory(this.state.data).then(res => {
            console.log(res.data.code)
            if (res.data.code === 201) {
                message.success('添加成功,正在跳转....');
                setTimeout(() => {
                    this.props.history.push("/sortmanage/index")
                }, 1000)
            } else {
                message.error('添加出错');
            }
        }).catch(err => {
            message.error('添加出错');
        })
    }
    render() {
        // 提交时候
        const { data } = this.state
        return (
            <div style={{ backgroundColor: "#fff" }}>
                   <TypingCard source={"添加店铺信息"} />
                < Form className="login-form" style={{ width: "400px", margin: "auto" }} >
                    <Form.Item style={{ margin: "0" }} label="一级分类">
                        <Input
                            onChange={(e) => {
                                data.parentName = e.target.value
                            }}
                        />
                    </Form.Item>
                    <Form.Item style={{ margin: "0" }} label="二级分类">
                        <Input
                            onChange={(e) => {
                                data.secondName = e.target.value
                            }}
                        />
                    </Form.Item>
      
                    <Button type='danger' style={{ width: "400px", marginTop: "10px" }} onClick={this.handleOk}>
                        添加
                    </Button>
                </Form >

            </div>
        );
    }
}