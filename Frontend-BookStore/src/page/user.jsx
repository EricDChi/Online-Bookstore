import { React, useState, useEffect } from "react";
import '../css/global.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import { getMe } from "../service/user";
import UserHome from "../components/user_home";

const UserPage = () => {
    const [user, setUser] = useState(null);

    const checkLogin = async() => {
        let me = await getMe();
        setUser(me);
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="card-container">
                    <UserHome user={user}/>
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default UserPage;