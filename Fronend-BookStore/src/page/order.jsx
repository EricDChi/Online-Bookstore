import { React, useEffect, useState } from "react";
import '../css/global.css';
import { Col, Row, Input } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getOrders, searchOrders } from "../service/order";
import { OrderTable } from "../components/order_table";
import { useSearchParams } from "react-router-dom";
const { Search } = Input;

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);

    const keyword = searchParams.get("keyword") || "";
    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    const getOrders = async () => {
        let pagedOrders = await searchOrders(keyword, pageIndex, pageSize);
        let orders = pagedOrders.items;
        let totalPage = pagedOrders.total;
        setOrders(orders);
        setTotalPage(totalPage);
    }


    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    }

    const handleSearch = (keyword) => {
        setSearchParams({
            "keyword": keyword,
            "pageIndex": 0,
            "pageSize": 10
        });
    };

    useEffect(() => {
        getOrders();
    }, [pageIndex, pageSize, keyword]);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <Search placeholder="输入关键字" onSearch={handleSearch} size="large"
                        style={{ marginBottom: "20px" }}
                    />
                    <OrderTable orders={orders}  
                        pageSize={pageSize} 
                        current={pageIndex + 1} 
                        total={totalPage * pageSize} 
                        onPageChange={handlePageChange} 
                    />
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default OrderPage;