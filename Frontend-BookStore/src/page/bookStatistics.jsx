import { React, useEffect, useState } from "react";
import '../css/global.css';
import { Col, Row, DatePicker } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { useSearchParams } from "react-router-dom";
import { StatisticsBookTable } from "../components/statistics_book_table";
import { analyzeBooks } from "../service/book";
const { RangePicker } = DatePicker;

const BookStatisticsPage = () => {
    const [books, setBooks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalPage, setTotalPage] = useState(0);

    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const getBooks = async () => {
        let pagedBooks = await analyzeBooks(pageIndex, pageSize, startDate, endDate);
        let books = pagedBooks.items;
        let totalPage = pagedBooks.total;
        setBooks(books);
        setTotalPage(totalPage);
    }

    const handlePageChange = (page) => {
        setSearchParams({ 
            "startDate": startDate,
            "endDate": endDate,
            "pageIndex": page - 1,
            "pageSize": 10
        });
    }

    const handleDateChange = (dates) => {
        let start = '', end = '';
        if (dates !== null) {
            start = dates[0].format("YYYY-MM-DD 00:00:00");
            end = dates[1].format("YYYY-MM-DD 23:59:59");
        }
        setSearchParams({
            "startDate": start,
            "endDate": end,
            "pageIndex": 0,
            "pageSize": 10
        });
    }

    useEffect(() => {
        getBooks();
    }, [pageIndex, pageSize, startDate, endDate]);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <RangePicker style={{ marginBottom: "20px" }} onChange={handleDateChange}/>
                    <StatisticsBookTable books={books}  
                        pageSize={pageSize} 
                        current={pageIndex + 1} 
                        total={totalPage * pageSize} 
                        onPageChange={handlePageChange} 
                    />
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default BookStatisticsPage;