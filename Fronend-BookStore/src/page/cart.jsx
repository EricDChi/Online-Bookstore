import { React, useEffect, useState } from "react";
import '../css/global.css';
import '../css/cart.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getCartItems } from "../service/cart";
import { CartTable } from "../components/cart_table";

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const initCartItems = async () => {
        let cartBooks = await getCartItems();
        setCartItems(cartBooks);
    }

    useEffect(() => {
        initCartItems();
    }, []);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="cart-container">
                    <CartTable cartItems={cartItems} onMutate={initCartItems}/>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default CartPage;