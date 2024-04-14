import { React } from "react";

import '../css/global.css';
import '../css/user.css';
import { Col, Row } from 'antd'; 
import { PrivateLayout } from "../components/layout";
import UserHome from "../components/user_home";

const UserPage = () => {
    return (
        <PrivateLayout>
            <Row justify="center">
                <Col className="user-home-container">
                    <UserHome />
                </Col>
            </Row>
        </PrivateLayout>
    );
};
export default UserPage;