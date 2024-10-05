import { React, useEffect, useState } from "react";

import '../css/global.css';
import { Button, Col, Row, Input } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { searchBooks } from "../service/book";
import BookTable from "../components/book_table";
import PlaceBookModal from "../components/place_book_modal";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getMe } from "../service/user";
const { Search } = Input;

const ManageBookPage = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);
    const navigate = useNavigate();

    const keyword = searchParams.get("keyword") || "";
    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    const checkLogin = async() => {
        let me = await getMe();
        if (me && me.role !== 1) {
            navigate("/");
        }
    }

    const getBooks = async () => {
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        let books = pagedBooks.items;
        if (books.length === 0 && pageIndex > 0) {
            setSearchParams({ ...searchParams, pageIndex: pageIndex - 1 });
            return;
        }
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleOpenBookModal = (book) => {
        setEditingBook(book);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBook(null);
    }

    const handleOrderSubmit = () => {
        setShowModal(false);
        getBooks();
        setEditingBook(null);
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
        checkLogin();
        getBooks();
    }, [pageIndex, pageSize, keyword]);

    return <>
        {showModal && <PlaceBookModal onCancel={handleCloseModal} book={editingBook} onOk={handleOrderSubmit} />}
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <Search placeholder="输入关键字" onSearch={handleSearch} size="large" />
                    <Button 
                        onClick={handleOpenModal}
                        className="button"
                        style={{ 
                            marginTop: "20px",
                            marginBottom: "20px"
                        }}
                    >
                        添加图书
                    </Button>
                    <BookTable 
                        books={books} 
                        onMutate={getBooks} 
                        pageSize={pageSize} 
                        current={pageIndex + 1} 
                        total={totalPage * pageSize}
                        onPageChange={handlePageChange} 
                        onOpenBookModal={handleOpenBookModal}
                    />
                </Col>
            </Row>
        </PrivateLayout>
    </>;
};
export default ManageBookPage;