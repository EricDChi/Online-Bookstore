import { React, useEffect, useState } from "react";
import '../css/global.css';
import '../css/cart.css';
import useMessage from "antd/es/message/useMessage";
import { Col, Row, Image, Typography, Button, Input, Space, Card } from 'antd'; 
import { useParams, useSearchParams} from "react-router-dom";
import { BasicLayout, PrivateLayout } from "../components/layout";
import { getCartBooks } from "../service/cart";
import { CartTable } from "../components/cart_table";

const CartPage = () => {
    const [cartBooks, setCartBooks] = useState([]);

    const initCartBooks = async () => {
        let cartBooks = await getCartBooks();
        setCartBooks(cartBooks);
    }

    useEffect(() => {
        initCartBooks();
    }, []);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="cart-container">
                    <CartTable cartBooks={cartBooks}/>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default CartPage;