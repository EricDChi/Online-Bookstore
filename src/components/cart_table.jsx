import { Button, InputNumber, Row, Col, Typography, Image, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceOrderModal from "./place_order_modal";
const { Paragraph } = Typography;

export function CartTable ({ cartBooks }) {
    const [items, setItems] = useState(cartBooks);
    const [showModal, setShowMadal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        setItems(cartBooks);
    },[cartBooks]);

    const handleOpenModal = () => {
        setShowMadal(true);
    }

    const handleCloseModal = () => {
        setShowMadal(false);
    }

    const computeTotalPrice = () => {
        const prices = selectedItems.map(item => item.book.price * item.number);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) : 0;
    }

    const columns = [
        {
            width: 500,
            title: '书名',
            dataIndex: 'book',
            key: 'book_title',
            render: book => (<Link to={`/book/${book.id}`}>{book.title}</Link>)
        },
        {
            width: 150,
            title: '数量',
            dataIndex: 'number',
            key: 'number',
            render: (number, item) => <InputNumber min={1} defaultValue={number} />
        },
        {
            width: 150,
            title: '价格',
            dataIndex: 'book',
            key: 'book_price',
            render: book => book.price
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'action',
            render: (item) => <Button type="primary">删除</Button>,
        },
    ];

    return <>
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} selectedItems={selectedItems} onOk={handleOpenModal} />}
        <Table
            columns={columns}
            rowSelection={{
                onChange: (_, selectedRows) => {
                    setSelectedItems(selectedRows);
                },
                getCheckboxProps: (item) => ({
                    disabled: item.book.title === '该书籍已失效',
                    name: item.book.title,
                }),
            }}
            expandable={{
                expandedRowRender: (item) => (
                    <Row>
                        <Col span={4}>
                            <Image src={item.book.cover} height={200} />
                        </Col>
                        <Col span={19} offset={1}>
                            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{item.book.book_description}</Paragraph>
                        </Col>
                    </Row>
                )
            }}
            dataSource={items.map(item => ({
                ...item,
                key: item.id
            }))}
        />
        <Row>
            <Col span={12}>
                <Row className="cart-price-box">
                    {(selectedItems.length == 0)? 
                        <Paragraph className="hidden-text"></Paragraph> :
                        <Paragraph className="hidden-text">已选{selectedItems.length}件，</Paragraph>
                    }
                    <Paragraph className='text'>合计:</Paragraph>
                    <Paragraph className='price symbol'>¥</Paragraph>
                    <Paragraph className='price'>{computeTotalPrice()}</Paragraph>
                </Row>
            </Col>
            <Col span={12}>
                <Button className="cart-button-buy" disabled={selectedItems.length === 0} onClick={handleOpenModal} style={{float:"right"}}>结算</Button>
            </Col>
        </Row>
    </>
}