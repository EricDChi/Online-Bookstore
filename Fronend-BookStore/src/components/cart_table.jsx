import { Button, InputNumber, Row, Col, Typography, Image, Table, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlaceOrderModal from "./place_order_modal";
import { getMe } from "../service/user";
import { changeCartItemNumber, deleteCartItem } from "../service/cart";
import { IMAGE_PREFIX } from "../service/common";
import { handleBaseApiResponse } from "../utils/message";
const { Paragraph } = Typography;

export function CartTable ({ cartItems, onMutate }) {
    const [items, setItems] = useState(cartItems);
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [user, setUser] = useState(null);

    const checkLogin = async() => {
        let me = await getMe();
        setUser(me);
    }

    useEffect(() => {
        setItems(cartItems);
        checkLogin();
    },[cartItems]);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOrderSubmit = () => {
        setSelectedItems([]);
        setShowModal(false);
        onMutate();
    }

    const computeTotalPrice = () => {
        const prices = selectedItems.map(item => item.book.price * item.number);
        return prices.length > 0 ?
            prices.reduce((prev, cur) => prev + cur) / 100 : 0;
    }

    const handleNumberChange = async (id, number) => {
        changeCartItemNumber(id, number);
        items.filter(item => item.id === id)[0].number = number;
        let selected = selectedItems.find(item => item.id === id);
        if (selected) {
            selected.number = number;
            setSelectedItems([...selectedItems]);
        }
       setItems([...items]);
    }

    const handleDelete = async (id) => {
        let res = await deleteCartItem(id);
        handleBaseApiResponse(res, messageApi);
        const index = items.findIndex((item) => id === item.id);
        items.splice(index, 1);
        let selected = selectedItems.find(item => item.id === id);
        if (selected) {
            selectedItems.splice(selectedItems.indexOf(selected), 1);
            setSelectedItems([...selectedItems]);
        }
       setItems([...items]);
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
            key: 'book_number',
            render: (number, item) => <InputNumber min={1} defaultValue={number} onChange={(newNumber) => {
                handleNumberChange(item.id, newNumber);
            }} />
        },
        {
            width: 150,
            title: '价格',
            dataIndex: 'book',
            key: 'book_price',
            render: book => book.price / 100
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'action',
            render: (item) => <Button type="primary" onClick={() => {
                handleDelete(item.id);
            }}>删除</Button>,
        },
    ];

    return <>
        {contextHolder}
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} user={user} selectedItems={selectedItems} onOk={handleOrderSubmit} />}
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
                            <Image src={IMAGE_PREFIX + "/" + item.book.cover} />
                        </Col>
                        <Col span={19} offset={1}>
                            <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{item.book.bookDescription?item.book.bookDescription.replace(/\\n/g, '\n'):null}</Paragraph>
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
                    {(selectedItems.length === 0)? 
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