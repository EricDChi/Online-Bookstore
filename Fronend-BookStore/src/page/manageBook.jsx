import { React, useEffect, useState } from "react";

import '../css/global.css';
import { Button, Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getAllBooks } from "../service/book";
import BookTable from "../components/book_table";
import PlaceBookModal from "../components/place_book_modal";

const ManageBookPage = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getBooks = async () => {
        let books = await getAllBooks();
        setBooks(books);
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

    useEffect(() => {
        getBooks();
    }, []);

    return <>
        {showModal && <PlaceBookModal onCancel={handleCloseModal} book={null} onOk={handleOrderSubmit} />}
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <Button onClick={handleOpenModal}>添加图书</Button>
                    <BookTable books={books}/>
                </Col>
            </Row>
        </PrivateLayout>
    </>;
};
export default ManageBookPage;