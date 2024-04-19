import { Button, Row, Col, Typography, Table } from "antd";
import { useEffect, useState } from "react";
const { Paragraph } = Typography;

export function BillTable ({ selectedItems }) {
    const [items, setItems] = useState(selectedItems);

    useEffect(() => {
        setItems(selectedItems);
    },[selectedItems]);

    const computeTotalPrice = () => {
        let total_price = 0;
        for (const item of selectedItems) {
            total_price += item.book.price * item.number;
        }
        return total_price;
    }

    const columns = [
        {
            width: 500,
            title: '书名',
            dataIndex: 'book',
            key: 'book_title',
            render: book => book.title
        },
        {
            width: 150,
            title: '数量',
            dataIndex: 'number',
            key: 'book_number',
            render: number => number
        },
        {
            width: 150,
            title: '价格',
            dataIndex: 'book',
            key: 'book_price',
            render: book => book.price
        },
    ];

    return <>
        <Table
            columns={columns}
            dataSource={items.map(item => ({
                ...item,
                key: item.id
            }))}
            pagination={ false }
        />
        <Row className="cart-price-box">
            <Paragraph className='text'>合计:</Paragraph>
            <Paragraph className='price symbol'>¥</Paragraph>
            <Paragraph className='price'>{computeTotalPrice()}</Paragraph>
        </Row>
    </>
}