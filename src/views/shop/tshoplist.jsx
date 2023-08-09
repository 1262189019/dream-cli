import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Input, message, Popconfirm } from 'antd';
import { deletetshop, tshoplist, updateshop, getshopitem } from '@/api/shop'
const { Search } = Input;


export default () => {
  const [tableData, setTableData] = useState([]); // 使用 state 来保存表格数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [spu_id, setspu_id] = useState("");
  const [price, setPrice] = useState("");
  const [param, setparam] = useState("");
  const [stock, setstock] = useState("");
  const [id, setId] = useState("");
  const [imgs, setImgs] = useState("");





  // 显示时执行
  const showModal = (record) => {
    setVisible(true);
    setId(record?.id || "")
    setTitle(record?.title || "")
    setparam(record?.param || "")
    setspu_id(record?.spu_id || "")
    setstock(record?.stock || "")
    setPrice(record?.price || "")
  };

  // 提交时执行
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      handleUpdateShop({
        id,
        title,
        spu_id,
        imgs,
        price,
        param,
        stock
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
      title: '标题',
      width: 100,
      dataIndex: 'title',
      className: "shoplist",
      ellipsis: true
    },
    {
      title: 'spu_id',
      width: 100,
      dataIndex: 'spu_id',
      ellipsis: true
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 50,
      render: (text) => <span style={{ color: "red", fontSize: "16px" }}>￥{text}</span>,
    },
    {
      title: '产品参数',
      dataIndex: 'param',
      key: 'param',
      width: 50,
    },
    {
      title: '股票',
      dataIndex: 'stock',
      key: 'stock',
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
          onConfirm={() => handleDeleteShop(record.id)}
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
        <button onClick={() => showModal(record)} style={{
          backgroundColor: "green", cursor: "pointer", color: "white", border: "none", userSelect: "none", height: "32px", padding
            : "0 15px", fontSize: "14px", borderRadius: "4px", width: "63px"
        }}><span>更 新</span> </button>
      ),
    },
  ];
  const [category_id, setcategory_id] = useState("0")
  const [newCategoryId, setNewCategoryId] = useState("");
  const handleClick = () => {
    setcategory_id(newCategoryId);
  };
  const handleDeleteShop = async (id) => {
    try {
      const response = await deletetshop(id); // 调用 deleteshop 函数发送请求

      // 处理成功删除的逻辑，比如从表格数据中移除该商品
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
      message.success("商品删除成功");
    } catch (error) {
      // 处理请求失败的错误
      message.error('商品删除失败');
    }
  };

  useEffect(() => {
    // 发送请求并处理响应
    const fetchData = async () => {
      try {
        const response = await tshoplist(); // 调用 shoplist 函数发送请求
        const shop = response.data.data;

        // 将响应数据保存到表格数据中
        const newData = shop.map((element) => ({
          key: element.id,
          id: element.id,
          title: element.title,
          spu_id: element.spu_id,
          price: element.price,
          param: element.param,
          stock: element.stock
        }));
        setTableData(newData);

      } catch (error) {
        console.error(error);
      }
    };

    const fetchclassDate = async () => {
      try {
        const response = await getshopitem({ id: category_id }); // 调用 shoplist 函数发送请求
        const shop = response.data.data;

        // 将响应数据保存到表格数据中
        const newData = shop.map((element) => ({
          key: element.id,
          id: element.id,
          title: element.title,
          spu_id: element.spu_id,
          price: element.price,
          param: element.param,
          stock: element.stock
        }));
        setTableData(newData);

      } catch (error) {
        console.error(error);
      }
    };

    if (category_id === "0") {
      fetchData();
    } else if (category_id !== "0") {
      fetchclassDate(category_id);
    }
  }, [category_id]);


  const handleUpdateShop = async (record) => {
    try {
      const { id, title, imgs, price, special_price, is_special } = record;
      const requestData = {
        id,
        title,
        img: imgs,
        price,
        special_price,
        is_special,
      };

      const response = await updateshop(requestData); // 调用 updateshop 函数并传递 requestData
    } catch (error) {
      console.error('商品更新失败', error);
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
    <div className="app-container">
      <Search
        style={{ width: '200px', marginBottom: "10px" }}
        size='large'
        placeholder="输入id搜索"
        onSearch={(value) => { handleClick(value) }}
        enterButton />
      <Table
        columns={columns}
        dataSource={tableData}
        size="small"
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
            <span>商品id</span>
            <Input value={id} onChange={(e) => setId(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>商品标题</span>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>产品id</span>
            <Input value={spu_id} onChange={(e) => setspu_id(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>商品图片</span>
            <Input value={imgs} onChange={(e) => setImgs(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>商品价格</span>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>产品参数</span>
            <Input value={param} onChange={(e) => setparam(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>股票</span>
            <Input value={stock} onChange={(e) => setstock(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};