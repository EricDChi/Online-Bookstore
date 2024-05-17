import { React, useEffect, useState } from "react";

import '../css/global.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getAllBooks } from "../service/book";
import { UserTable } from "../components/user_table";

const ManageBookPage = () => {
    const [books, setBooks] = useState([]);

    const getBooks = async () => {
        let books = await getAllBooks();
        setBooks(books);
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <UserTable books={books}/>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default ManageBookPage;