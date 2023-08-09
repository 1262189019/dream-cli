import React, { useState, useEffect } from 'react';
import { Table, Input, Button } from 'antd';
import { shoplist, getClassify } from '@/api/shop.js'
const { Search } = Input;
export default App => {
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
      title: '图片',
      dataIndex: 'imgs',
      key: 'imgs',
      width: 50,
      ellipsis: true,
      render: (text) => <img src={text} alt="商品图片" style={{ width: "50px", height: "50px" }} />,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 50,
      render: (text) => <span style={{ color: "red", fontSize: "16px" }}>￥{text}</span>,
    },
    {
      title: '惠后价格',
      dataIndex: 'special_price',
      key: 'special_price',
      width: 50,
      render: (text) => <span style={{ color: "red", fontSize: "16px" }}>￥{text}</span>,

    },

    {
      title: 'is_special',
      dataIndex: 'is_special',
      key: 'is_special',
      width: 50,
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
  ];
  const [tableData, setTableData] = useState([]); // 使用 state 来保存表格数据
  const [category_id, setcategory_id] = useState("0")
  const [newCategoryId, setNewCategoryId] = useState("");
  const handleClick = () => {
    setcategory_id(newCategoryId);
  };

  useEffect(() => {
    // 发送请求并处理响应
    let page = 1;

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



  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
        placeholder="输入内容搜索"
        onSearch={value => console.log(value)}
        enterButton />
      <Table
        columns={columns}
        dataSource={tableData}
        size={'middle'}
      />
    </div>
  )
}