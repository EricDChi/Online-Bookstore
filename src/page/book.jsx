import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/book.css';
import useMessage from "antd/es/message/useMessage";
import BookList from "../components/book_list";
import { Col, Row, Image, Typography, Button, Input, Space, Card } from 'antd'; 
import { useSearchParams} from "react-router-dom";
import { BasicLayout, PrivateLayout } from "../components/layout";
import { searchBooks } from "../service/books";
import Book from "../pages/Book";
import BookDetails from "../components/book_details";

const BookPage = () => {

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="book-details-container">
                    <BookDetails />
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default BookPage;