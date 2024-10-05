import { React, useEffect, useState } from "react";

import '../css/global.css';
import { Col, DatePicker, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { rankBooks } from "../service/book";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getMe } from "../service/user";
import BookRankChart from "../components/book_rank_chart";
const { RangePicker } = DatePicker;

const RankBookPage = () => {
    const [books, setBooks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";

    const handleDateChange = (dates) => {
        let start = '', end = '';
        if (dates !== null) {
            start = dates[0].format("YYYY-MM-DD 00:00:00");
            end = dates[1].format("YYYY-MM-DD 23:59:59");
        }
        setSearchParams({
            "startDate": start,
            "endDate": end,
        });
    }

    const checkLogin = async() => {
        let me = await getMe();
        if (me && me.role !== 1) {
            navigate("/");
        }
    }

    const getBooks = async () => {
        let rankedBooks = await rankBooks(startDate, endDate);
        console.log(rankedBooks);
        setBooks(rankedBooks.items);
    }

    useEffect(() => {
        checkLogin();
        getBooks();
    }, [startDate, endDate]);

    return <>
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <RangePicker style={{ marginBottom: "20px" }} placeholder={["开始时间", "结束时间"]} onChange={handleDateChange}/>
                    <BookRankChart books={books}/>
                </Col>
            </Row>
        </PrivateLayout>
    </>;
};
export default RankBookPage;