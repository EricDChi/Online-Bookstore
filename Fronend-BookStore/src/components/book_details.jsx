import { Row, Col, Image, Button } from "antd";
import { useEffect } from "react";
import { addCartItem } from "../service/cart";
import { useState } from "react";
import { Typography, Divider, Space, message } from "antd";
import PlaceOrderModal from "./place_order_modal";
import { getMe } from "../service/user";
import { IMAGE_PREFIX } from "../service/common";
import { handleBaseApiResponse } from "../utils/message";
const { Title, Paragraph } = Typography;

export default function BookDetails({ book, onMutate }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);

    const checkLogin = async() => {
        let me = await getMe();
        setUser(me);
    }

    const handleAddCart = async() => {
        let res = await addCartItem(book.id);
        handleBaseApiResponse(res, messageApi);
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOrderSubmit = () => {
        setShowModal(false);
        onMutate();
    }

    useEffect(() =>{
        const items = [
            {
                id: 1,
                bookId: book.id,
                number: 1,
                book: book
            }
        ];
        setSelectedItems(items);
        checkLogin();
    }, [book])


    return <>
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} user={user} selectedItems={selectedItems} onOk={handleOrderSubmit} />}
        <Space direction="vertical">
            {contextHolder}
            <Row>
                <Col span={9}>
                    <Image src={IMAGE_PREFIX + "/" + book.cover} alt={book.title}></Image>
                </Col>
                <Col span={14} offset={1}>
                    <Title level={3} style={{ fontWeight:'bold' }}>{book.title}</Title>
                    <Row className='price-box'>
                        <Paragraph className='text'>售价</Paragraph>
                        <Paragraph className='price symbol'>¥</Paragraph>
                        <Paragraph className='price'>{book.price / 100}</Paragraph>
                    </Row>
                    <Paragraph>作者：{book.author}</Paragraph>
                    <Paragraph>出版社：{book.publisher}</Paragraph>
                    <Paragraph>ISBN编号: {book.isbn}</Paragraph>
                    <Paragraph>销量：{book.sales}</Paragraph>
                    <Paragraph>库存：{book.stock}</Paragraph>
                    <Row style={{ marginTop:'30px' }}>
                        <Button className='button-buy' onClick={handleOpenModal}>立即购买</Button>
                        <Button className='button-cart'  onClick={handleAddCart}>加入购物车</Button>
                    </Row>
                </Col>
            </Row>
            <Row style={{ margin:'20px' }}>
                <Divider orientation="left">内容简介</Divider>
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{book.bookDescription?book.bookDescription.replace(/\\n/g, '\n'):null}</Paragraph>
                <Divider orientation="left">作者简介</Divider>
                <Paragraph style={{ whiteSpace: 'pre-wrap'}}>{book.authorDescription?book.authorDescription.replace(/\\n/g, '\n'):null}</Paragraph>
            </Row>
        </Space>
    </>
}