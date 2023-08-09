import React, { useState, useEffect } from 'react';
import { getAllRating } from "../../api/ratingManage"
import { Table, message } from "antd"
// 导入修改组件和删除组件和搜索组件
import FormModel from './components/FormModel';
import DelModel from './components/DelModel';
import SearchModel from './components/SearchModel';
export default function RatingManage() {
    let [ratingList, setRatingList] = useState([])
    useEffect(() => {
        getAllRating().then(res => {
            if (res.data.code === 200) {
                message.success("获取数据成功")
                res.data.data.forEach((v, i) => {
                    v.key = i
                })
                setRatingList(res.data.data)
            } else {
                message.error("获取出错")
            }
        })
    }, [])
    // 递归深拷贝
    function deepCopy(dir) {
        let newOA
        // 是数组
        if (Object.prototype.toString.call(dir) === "[object Array]") {
            newOA = []
            dir.forEach((v, i) => {
                if (typeof v !== "object") {
                    newOA.push(v)
                } else {
                    newOA.push(deepCopy(v))
                }
            })
            // 是对象
        } else if (Object.prototype.toString.call(dir) === "[object Object]") {
            newOA = {}
            for (let k in dir) {
                if (typeof dir[k] !== "object") {
                    newOA[k] = dir[k]
                } else {
                    newOA[k] = deepCopy(dir[k])
                }
            }
        } else {
            newOA = dir
        }
        return newOA
    }
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '产品id',
            dataIndex: 'sku_id',
            key: 'sku_id',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
        },
        {
            title: '评分',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: '买家评论',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: '商户id',
            dataIndex: 'store_id',
            key: 'store_id',
        },
        {
            title: '用户id',
            dataIndex: 'customer_id',
            key: 'customer_id',
        },
        {
            title: "修改",
            key: 'action',
            render(item) {
                return (
                    <>
                        {/* 修改操作 */}
                        <FormModel data={item}
                            // 修改本地数据
                            onOperate={(item) => {
                                // 此处接收数据需要深拷贝,不然不渲染页面
                                let copyRatingList = deepCopy(ratingList)
                                let index = copyRatingList.findIndex(v => v.id === item.id)
                                copyRatingList[index].rating = item.rating
                                copyRatingList[index].comment = item.comment
                                // 重置数据，页面渲染
                                setRatingList(copyRatingList)
                            }}>操作</FormModel>
                    </>
                )
            }
        },
        {
            title: "删除",
            key: 'del',
            render(item) {
                return (
                    <>
                  
                        {/* 删除操作 */}
                        <DelModel data={item} onDel={() => {
                            // 删除此项数据并重新渲染页面
                            let copyRatingList = deepCopy(ratingList).filter(v => v.id !== item.id)
                            setRatingList(copyRatingList)
                        }}>删除</DelModel>
                    </>
                )
            }
        }
    ];

    return (
        <div className='app-container '>

            {/* 搜索选项 */}
            <SearchModel
                placeholder={"请输入字段进行搜索"}
                onSearch={(list) => {
                    list.forEach((v, i) => {
                        v.key = i
                    })
                    setRatingList(list)
                }} />
            {/* 渲染数据 */}
            <Table dataSource={ratingList} columns={columns} />
        </div>
    )
}


