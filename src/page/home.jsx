import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/home.css';
import BookList from "../components/book_list";
import { Col, Row, Space } from 'antd'; 
import { useSearchParams} from "react-router-dom";
import { PrivateLayout, VerticalLayout } from "../components/layout";
import { searchBooks } from "../service/books";

const HomePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    const getBooks = async () => {
        let pagedBooks = await searchBooks('', pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    }

    useEffect(() => {
        getBooks();
    }, [pageIndex, pageSize])

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