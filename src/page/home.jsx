import { React, useEffect} from "react";

import '../css/global.css';
import '../css/home.css';
import useMessage from "antd/es/message/useMessage";
import BookList from "../components/book_list";
import { Col, Row, Image, Typography, Button, Input, Space, Card } from 'antd'; 
import { useSearchParams} from "react-router-dom";
import { BasicLayout, PrivateLayout } from "../components/layout";
import getBooks from "../service/books";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = 10;
    const pageIndex = 0;
    const totalPage = 1;

    var books=getBooks();

    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    }

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="booklist-container"  span={22}>
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        <BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />
                    </Space>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default HomePage;