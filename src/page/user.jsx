import { React, useEffect, useState } from "react";

import '../css/global.css';
import '../css/user.css';
import useMessage from "antd/es/message/useMessage";
import { Col, Row } from 'antd'; 
import { useParams, useSearchParams} from "react-router-dom";
import { BasicLayout, PrivateLayout } from "../components/layout";
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