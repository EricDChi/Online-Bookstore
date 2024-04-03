import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/home.css';
import useMessage from "antd/es/message/useMessage";
import BookList from "../components/book_list";
import { Col, Row, Image, Typography, Button, Input, Space, Card } from 'antd'; 
import { useSearchParams} from "react-router-dom";
import { BasicLayout, PrivateLayout } from "../components/layout";
import { searchBooks } from "../service/books";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    const keyword = searchParams.get("keyword") || "";

    const getBooks = async () => {
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    }

    useEffect(() => {
        getBooks();
    }, [keyword, pageIndex, pageSize])

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