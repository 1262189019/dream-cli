import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Input, message, Popconfirm } from 'antd';
import { deletecustomer, userlist, updatecustomer } from '../../api/customer'
const { Search } = Input;

export default () => {
  const [tableData, setTableData] = useState([]); // 使用 state 来保存表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [tel, settel] = useState('');
  const [nickname, setnickname] = useState('');


  // 提交时执行
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      handleUpdateShop({
        username,
        password,
        email,
        tel,
        nickname
      });
    }, 2000);
    message.success('修改成功')
  };

  // 取消时执行
  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: 'id',
      width: 50,
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: '账号',
      width: 100,
      dataIndex: 'username',
      key: 'username',
      className: "shoplist",
      ellipsis: true
    },
    {
      title: '密码',
      width: 100,
      dataIndex: 'password',
      ellipsis: true
    },
    {
      title: '手机号',
      dataIndex: 'tel',
      key: 'tel',
      width: 50,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: 50,
    },
    {
      title: '删除',
      dataIndex: 'operation',
      key: 'operation',
      width: 50,
      render: (text, record, index) => (
        <Popconfirm
          title="确定删除"
          cancelText="取消"
          okText="确定"
          onConfirm={() => handleDeleteShop(record.username)}
        >
          <Button type='danger' style={{}}>删除</Button>
        </Popconfirm>
      ),
    },
    {
      title: '更新',
      dataIndex: 'update',
      key: 'update',
      width: 50,
      render: (text, record) => (
        <button onClick={() => showModal(record)} style={{ backgroundColor: "green", cursor: "pointer", color: "white", border: "none", userSelect: "none", height: "32px", padding: "0 15px", fontSize: "14px", borderRadius: "4px", width: "63px" }}>
          <span>更 新</span>
        </button>
      ),
    },
  ];
  const showModal = (record) => {
    setusername(record?.username || '');
    setpassword(record?.password || '');
    setemail(record?.email || '');
    settel(record?.tel || '');
    setnickname(record?.nickname || '');
    setVisible(true);
  };
  const handleDeleteShop = async (username) => {
    try {
      const response = await deletecustomer(username); // 调用 deleteshop 函数发送请求

      // 处理成功删除的逻辑，比如从表格数据中移除该商品
      setTableData((prevData) => prevData.filter((item) => item.username !== username));
      message.success("用户删除成功");
    } catch (error) {
      // 处理请求失败的错误
      message.error('用户删除失败');
    }
  };

  useEffect(() => {
    // 发送请求并处理响应
    const fetchData = async () => {
      try {
        const response = await userlist(); // 调用 shoplist 函数发送请求
        const shop = response.data.data;
        // 将响应数据保存到表格数据中
        const newData = shop.map((element, index) => ({
          id: element.id,
          username: element.username,
          password: element.password,
          email: element.email,
          tel: element.tel,
          nickname: element.nickname,
          key: index
        }));
        setTableData(newData);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

  }, []);


  const handleUpdateShop = async (record) => {
    try {
      const { username, password, email, tel, nickname } = record;
      const requestData = {
        username,
        password,
        email,
        tel,
        nickname,
      };

      const response = await updatecustomer(requestData); // 调用 updateshop 函数并传递 requestData
    } catch (error) {
    }
  };




  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='app-container '>

      <Search
        style={{ width: '200px', marginBottom: "10px" }}
        size='large'
        placeholder="输入内容搜索"
        onSearch={value => console.log(value)}
        enterButton />

      <Table
        columns={columns}
        dataSource={tableData}
      // size="small"
      />

      <Modal
        title="更新商品"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form className="login-form">
          <Form.Item style={{ margin: "0" }}>
            <span>账号</span>
            <Input value={username} onChange={(e) => setusername(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>密码</span>
            <Input value={password} onChange={(e) => setpassword(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>邮箱</span>
            <Input value={email} onChange={(e) => setemail(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>手机号</span>
            <Input value={tel} onChange={(e) => settel(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>昵称</span>
            <Input value={nickname} onChange={(e) => setnickname(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};