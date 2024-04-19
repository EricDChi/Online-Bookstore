import { Row, Col, Image, Button } from "antd";
import { useEffect } from "react";
import { addCartBooks } from "../service/cart";
import { useState } from "react";
import { Typography, Divider, Space, message } from "antd";
import PlaceOrderModal from "./place_order_modal";
import { getMe } from "../service/user";
const { Title, Paragraph } = Typography;

export default function BookDetails({ book }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [showModal, setShowMadal] = useState(false);
    const [user, setUser] = useState(null);

    const checkLogin = async() => {
        let me = await getMe();
        setUser(me);
    }

    const handleAddCart = async() => {
        let res = await addCartBooks(book.id);
        if (res === true) {
            messageApi.info("添加成功");
        }
        else {
            messageApi.error("已在购物车内，请勿重复添加");
        }
    }

    const handleOpenModal = () => {
        setShowMadal(true);
    }

    const handleCloseModal = () => {
        setShowMadal(false);
    }

    useEffect(() =>{
        const items = [
            {
                id: book.id,
                number: 1,
                book: book
            }
        ];
        setSelectedItems(items);
        checkLogin();
    }, [])

    return <>
        {showModal && <PlaceOrderModal onCancel={handleCloseModal} user={user} selectedItems={selectedItems} onOk={handleOpenModal} />}
        <Space direction="vertical">
            {contextHolder}
            <Row>
                <Col span={9}>
                    <Image src={book.cover} alt=""></Image>
                </Col>
                <Col span={14} offset={1}>
                    <Title level={3} style={{ fontWeight:'bold' }}>{book.title}</Title>
                    <Row className='price-box'>
                        <Paragraph className='text'>售价</Paragraph>
                        <Paragraph className='price symbol'>¥</Paragraph>
                        <Paragraph className='price'>{book.price}</Paragraph>
                    </Row>
                    <Paragraph>作者：{book.author}</Paragraph>
                    <Paragraph>出版社：{book.publisher}</Paragraph>
                    <Paragraph>销量：{book.sales}</Paragraph>
                    <Row style={{ marginTop:'30px' }}>
                        <Button className='button-buy' onClick={handleOpenModal}>立即购买</Button>
                        <Button className='button-cart'  onClick={handleAddCart}>加入购物车</Button>
                    </Row>
                </Col>
            </Row>
            <Row style={{ margin:'20px' }}>
                <Divider orientation="left">内容简介</Divider>
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{book.book_description}</Paragraph>
                <Divider orientation="left">作者简介</Divider>
                <Paragraph style={{ whiteSpace: 'pre-wrap'}}>{book.author_description}</Paragraph>
            </Row>
        </Space>
    </>
}