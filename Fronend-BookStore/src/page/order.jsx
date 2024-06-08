import { React, useEffect, useState } from "react";
import '../css/global.css';
import { Col, Row, Input, DatePicker } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { searchOrders } from "../service/order";
import { OrderTable } from "../components/order_table";
import { useSearchParams } from "react-router-dom";
const { Search } = Input;
const { RangePicker } = DatePicker;

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);

    const keyword = searchParams.get("keyword") || "";
    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const getOrders = async () => {
        let pagedOrders = await searchOrders(keyword, pageIndex, pageSize, startDate, endDate);
        let orders = pagedOrders.items;
        let totalPage = pagedOrders.total;
        setOrders(orders);
        setTotalPage(totalPage);
    }

    const handlePageChange = (page) => {
        setSearchParams({ 
            "keyword": keyword,
            "startDate": startDate,
            "endDate": endDate,
            "pageIndex": page - 1,
            "pageSize": 10
        });
    }

    const handleSearch = (keyword) => {
        setSearchParams({
            "keyword": keyword,
            "startDate": startDate,
            "endDate": endDate,
            "pageIndex": 0,
            "pageSize": 10
        });
    };

    const handleDateChange = (dates) => {
        let start = '', end = '';
        if (dates !== null) {
            start = dates[0].format("YYYY-MM-DD 00:00:00");
            end = dates[1].format("YYYY-MM-DD 23:59:59");
        }
        setSearchParams({
            "keyword": keyword,
            "startDate": start,
            "endDate": end,
            "pageIndex": 0,
            "pageSize": 10
        });
    }

    useEffect(() => {
        getOrders();
    }, [pageIndex, pageSize, keyword, startDate, endDate]);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <Search placeholder="输入关键字" onSearch={handleSearch} size="large"
                        style={{ marginBottom: "20px" }}
                    />
                    <RangePicker style={{ marginBottom: "20px" }} onChange={handleDateChange}/>
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