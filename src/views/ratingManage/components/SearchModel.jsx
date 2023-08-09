import React, { useState } from 'react';
import { Input, Select, message, } from 'antd';
//    根据商品id获取评分  根据店铺id...   根据数据库id....
import { getAllRating, getRating, getRatingByStore, getRatingByID } from "../../../api/ratingManage"
const { Search } = Input
const { Option } = Select;
export default function SearchModel(props) {
    // 事件/占位符
    let { onSearch, placeholder } = props
    let [model, setModel] = useState(1)
    // 修改前置参数
    const changeSelect = (value) => {
        setModel(value)
    }
    // 确认搜索
    const handleSearch = (value) => {
        console.log("model", model, value)
        // 根据商户id搜索
        if (model === 1 && value) {
            getRatingByStore({ store_id: value }).then(res => {
                if (res.data.code === 200) {
                    message.success("获取数据成功")
                    onSearch(res.data.data)
                }
            }).catch(err => {
                message.error("请求数据失败")
                console.log(err)
            })
        } else if (model === 2 && value) {
            getRating({ sku_id: value }).then(res => {
                if (res.data.code === 200) {
                    message.success("获取数据成功")
                    onSearch(res.data.data)
                }
            }).catch(err => {
                message.error("请求数据失败")
            })
        } else if (model === 3 && value) {
            getRatingByID({ id: value }).then(res => {
                if (res.data.code === 200) {
                    message.success("获取数据成功")
                    onSearch(res.data.data)
                }
            }).catch(err => {
                message.error("请求数据失败")
            })
        } else {
            getAllRating().then(res => {
                if (res.data.code === 200) {
                    message.success("获取数据成功")
                    onSearch(res.data.data)
                }
            }).catch(err => {
                message.error("请求数据失败")
            })
        }
    }
    // 搜索框前置项
    const selectBefore = (
        <Select defaultValue="按商户id搜索" style={{ width: 120 }} onChange={changeSelect}>
            <Option value={1}>按商户id搜索</Option>
            <Option value={2}>按商品id搜索</Option>
            <Option value={3}>按id搜索</Option>
        </Select>
    );
    return (
        <div>
            <Search addonBefore={selectBefore} placeholder={placeholder || "请输入进行搜索"} onSearch={value => { handleSearch(value) }} enterButton style={{width:"400px", marginBottom:"10px"}} />
        </div>
    )
}