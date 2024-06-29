import { React, useEffect, useState } from "react";

import '../css/global.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { UserTable } from "../components/user_table";
import { getAllUsers, getMe, getPagedUsers } from "../service/user";
import { useNavigate, useSearchParams } from "react-router-dom";

const ManageUserPage = () => {
    const [users, setUsers] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [totalPage, setTotalPage] = useState(0);

    const pageSize = searchParams.get("pageSize") ? parseInt(searchParams.get("pageSize")) : 10;
    const pageIndex = searchParams.get("pageIndex") ? parseInt(searchParams.get("pageIndex")) : 0;

    const checkLogin = async() => {
        let me = await getMe();
        if (me && me.role !== 1) {
            navigate("/");
        }
    }

    const getUsers = async () => {
        let pagedUsers = await getPagedUsers(pageIndex, pageSize);
        let users = pagedUsers.items;
        if (users.length === 0 && pageIndex > 0) {
            setSearchParams({ ...searchParams, pageIndex: pageIndex - 1 });
            return;
        }
        let totalPage = pagedUsers.total;
        setUsers(users);
        setTotalPage(totalPage);
    }

    const handlePageChange = (page) => {
        setSearchParams({ ...searchParams, pageIndex: page - 1 });
    }

    useEffect(() => {
        checkLogin();
        getUsers();
    }, [pageIndex, pageSize]);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <UserTable 
                        users={users}
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
export default ManageUserPage;