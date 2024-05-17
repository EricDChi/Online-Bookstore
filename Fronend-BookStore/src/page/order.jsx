import { React, useEffect, useState } from "react";
import '../css/global.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getOrders } from "../service/order";
import { OrderTable } from "../components/order_table";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);

    const initOrders = async () => {
        let orders = await getOrders();
        setOrders(orders);
    }

    useEffect(() => {
        initOrders();
    }, []);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <OrderTable orders={orders}/>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default OrderPage;