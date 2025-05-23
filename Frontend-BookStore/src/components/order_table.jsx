import { Pagination, Table } from "antd";
import { formatTime } from "../utils/time";
import { List, Avatar } from "antd"
import { IMAGE_PREFIX } from "../service/common";

export function OrderTable ({ orders, current, pageSize, total, onPageChange }) {
    const columns = [
        { title: '收货人', dataIndex: 'addressee', key: 'addressee', },
        { title: '联系方式', dataIndex: 'phone', key: 'phone', },
        { title: '收货地址', dataIndex: 'address', key: 'address', },
        {
            title: '下单时间', dataIndex: 'createTime', key: 'createTime',
            render: (time) => formatTime(time)
        },
    ];

    function OrderItemList({ orderItems }) {
        return <List
            dataSource={orderItems}
            renderItem={(item, _) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar shape="square" size={80} src={IMAGE_PREFIX + "/" + item.cover} />}
                        title={item.title}
                        description={<span>数量：{item.number}<br/>总价：¥{item.price / 100}</span>}
                    />
                </List.Item>
            )}
        />
    }

    return <>
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: (order) => (
                    <OrderItemList orderItems={order.items} />
                ),
            }}
            dataSource={orders.map(order => ({
                ...order,
                key: order.id
            }))}
            pagination={false}
        />
        <Pagination
            current={current} 
            pageSize={pageSize} 
            total={total} 
            onChange={onPageChange}
            style={{ marginTop: "20px", float: "right"}}
        />
    </>
}