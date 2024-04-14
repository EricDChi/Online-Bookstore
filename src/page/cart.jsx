import { React, useEffect, useState } from "react";
import '../css/global.css';
import '../css/cart.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getCartBooks } from "../service/cart";
import { CartTable } from "../components/cart_table";
import { cart_books } from "../service/cart";

const CartPage = () => {
    const [cartBooks, setCartBooks] = useState([]);

    const initCartBooks = async () => {
        let cartBooks = await getCartBooks();
        setCartBooks(cartBooks);
    }

    useEffect(() => {
        initCartBooks();
    }, [cart_books]);

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