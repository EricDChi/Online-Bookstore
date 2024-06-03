import { React, useEffect, useState } from "react";

import '../css/global.css';
import { Button, Col, Row, Input } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { searchBooks } from "../service/book";
import BookTable from "../components/book_table";
import PlaceBookModal from "../components/place_book_modal";
import { useSearchParams } from "react-router-dom";
const { Search } = Input;

const ManageBookPage = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);

    const keyword = searchParams.get("keyword") || "";
    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    const getBooks = async () => {
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    }


    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleOrderSubmit = () => {
        setShowModal(false);
        getBooks();
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
        getBooks();
    }, [pageIndex, pageSize, keyword]);

    return <>
        {showModal && <PlaceBookModal onCancel={handleCloseModal} book={null} onOk={handleOrderSubmit} />}
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <Search placeholder="输入关键字" onSearch={handleSearch} size="large" />
                    <Button onClick={handleOpenModal}>添加图书</Button>
                    <BookTable books={books} onMutate={getBooks} pageSize={pageSize} current={pageIndex + 1} total={totalPage * pageSize} onPageChange={handlePageChange} />
                </Col>
            </Row>
        </PrivateLayout>
    </>;
};
export default ManageBookPage;