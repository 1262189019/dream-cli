import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Input, message, Popconfirm } from 'antd';
import { deleteshop, shoplist, updateshop, getClassify } from '@/api/shop'
const { Search } = Input;

export default () => {
  const [tableData, setTableData] = useState([]); // 使用 state 来保存表格数据
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [imgs, setImgs] = useState("");
  const [price, setPrice] = useState("");
  const [specialPrice, setSpecialPrice] = useState("");
  const [isSpecial, setIsSpecial] = useState("");
  const [id, setId] = useState("");


  // 显示时执行
  const showModal = (record) => {
    setVisible(true);
    setId(record?.id || "")
    setIsSpecial(record?.isSpecial || "")
    setSpecialPrice(record?.specialPrice || "")
    setPrice(record?.price || "")
    setImgs(record?.imgs || "")
    setTitle(record?.title || "")
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
        imgs,
        price,
        special_price: specialPrice,
        is_special: isSpecial
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
      className: 'shoplist',
      ellipsis: true,
    },
    {
      title: '图片',
      dataIndex: 'imgs',
      key: 'imgs',
      width: 50,
      ellipsis: true,
      render: (text) => <img src={text} alt="商品图片" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 50,
      render: (text) => <span style={{ color: 'red', fontSize: '16px' }}>￥{text}</span>,
    },
    {
      title: '惠后价格',
      dataIndex: 'special_price',
      key: 'special_price',
      width: 50,
      render: (text) => <span style={{ color: 'red', fontSize: '16px' }}>￥{text}</span>,
    },
    {
      title: '商品优惠类型',
      dataIndex: 'is_special',
      key: 'is_special',
      width: 60,
    },
    {
      title: '分类id',
      dataIndex: 'category_id',
      key: 'category_id',
      width: 50,
    },
    {
      title: '品类id',
      dataIndex: 'spg_id',
      key: 'spg_id',
      width: 50,
    },
    {
      title: '店铺id',
      dataIndex: 'store_id',
      key: 'store_id',
      width: 50,
    },
    {
      title: '品牌id',
      dataIndex: 'brand_id',
      key: 'brand_id',
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
      render: (a, record) => (
        <button onClick={() => showModal(record)} style={{
          backgroundColor: "green", cursor: "pointer", color: "white", border: "none", userSelect: "none", height: "32px", padding
            : "0 15px", fontSize: "14px", borderRadius: "4px", width: "63px"
        }}><span>更 新</span> </button>
      ),
    },
  ];
  const [category_id, setcategory_id] = useState("0")
  const handleClick = (value) => {
    setcategory_id(value);
  };
  const handleDeleteShop = async (id) => {
    try {
      const response = await deleteshop(id); // 调用 deleteshop 函数发送请求

      // 处理成功删除的逻辑，比如从表格数据中移除该商品
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
      message.success("商品删除成功");
      console.log('商品删除成功', response);
    } catch (error) {
      // 处理请求失败的错误
      console.error('商品删除失败', error);
      message.error('商品删除失败');
    }
  };
  useEffect(() => {
    // 发送请求并处理响应
    let page = 1;

    console.log(category_id);
    const fetchData = async (page) => {
      try {
        const response = await shoplist(page); // 调用 shoplist 函数发送请求
        const shop = response.data.data;

        // 将响应数据保存到表格数据中
        const newData = shop.map((element) => ({
          key: element.id,
          id: element.id,
          title: element.title,
          imgs: element.img,
          price: element.price,
          category_id: element.category_id,
          spg_id: element.spg_id,
          special_price: element.special_price,
          is_special: element.is_special,
          store_id: element.store_id,
          brand_id: element.brand_id,
        }));

        if (newData.length > 0) {
          // 如果获取到的数据不为空，则递归调用 fetchData 函数，并将 page 值加1
          setTableData((prevData) => [...prevData, ...newData]);
          fetchData(page + 1);
        }
      } catch (error) {
        console.error(error);
      }
    };


    const fetchclassDate = async () => {
      try {
        const response = await getClassify({ category_id }); // 调用 getClassify 函数发送请求
        const shop = response.data.data;
        // 将响应数据保存到表格数据中
        const newData = shop.map((element) => ({
          key: element.id,
          id: element.id,
          title: element.title,
          imgs: element.img,
          price: element.price,
          category_id: element.category_id,
          spg_id: element.spg_id,
          special_price: element.special_price,
          is_special: element.is_special,
          store_id: element.store_id,
          brand_id: element.brand_id,
        }));
        setTableData(newData);
      } catch (error) {
        console.error(error);
      }
    }

    if (category_id === "0") {
      fetchData(page);
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

      console.log('商品更新成功', response);
    } catch (error) {
      console.error('商品更新失败', error);
    }
  };

  return (

    <div className="app-container">
      <Search
        style={{ width: '200px', marginBottom: "10px" }}
        size='large'
        placeholder="输入内容搜索"
        onSearch={(value) => {handleClick(value)}}
        enterButton />

      <Table
        columns={columns}
        dataSource={tableData}
        size="middle"
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
            <span>商品图片</span>
            <Input value={imgs} onChange={(e) => setImgs(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>商品价格</span>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>优惠后价格</span>
            <Input value={specialPrice} onChange={(e) => setSpecialPrice(e.target.value)} />
          </Form.Item>
          <Form.Item style={{ margin: "0" }}>
            <span>商品优惠类型</span>
            <Input value={isSpecial} onChange={(e) => setIsSpecial(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};