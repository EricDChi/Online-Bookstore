import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/book.css';
import { Col, Row } from 'antd'; 
import { useParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { getBookById } from "../service/book";
import BookDetails from "../components/book_details";

const BookPage = () => {
    const [book, setBook] = useState(null);

    let { id } = useParams();

    const getBook = async () => {
        let book = await getBookById(id);
        setBook(book);
    }

    useEffect(() => {
        getBook();
    }, [id]);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    {book && <BookDetails book={book} onMutate={getBook}/>}
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default BookPage;