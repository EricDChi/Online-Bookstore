import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/home.css';
import BookList from "../components/book_list";
import { Col, Row, Space } from 'antd'; 
import { useSearchParams, useParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { getAuthorByTitle, searchBooks } from "../service/book";

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [author, setAuthor] = useState("");

    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    let { keyword } = useParams();

    const getBooks = async () => {
        let pagedBooks = await searchBooks(keyword, pageIndex, pageSize);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    }

    const getAuthor = async () => {
        let author = await getAuthorByTitle(keyword);
        console.log(author);
        setAuthor(author);
    }

    useEffect(() => {
        getAuthor();
    }, [keyword])

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
                        <h3>{author === "Book not found" ? "未找到相关作者" : "相关作者："+author}</h3>
                        <BookList books={books} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex + 1} onPageChange={handlePageChange} />
                    </Space>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default SearchPage;