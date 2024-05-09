import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/book.css';
import { Col, Row } from 'antd'; 
import { useParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { getBookById } from "../service/book";
import BookDetails from "../components/book_details";
import { UserTable } from "../components/user_table";
import { getAllUsers } from "../service/user";

const ManageUserPage = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        let users = await getAllUsers();
        setUsers(users);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="book-details-container">
                    <UserTable users={users}/>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default ManageUserPage;