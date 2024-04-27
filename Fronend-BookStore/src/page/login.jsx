import React from "react";

import '../css/global.css';
import { Col, Row } from 'antd'; 
import { BasicLayout } from "../components/layout";
import { LoginBox } from "../components/login_box";

const LoginPage = () => {
    return (
        <BasicLayout>
            <Row className="login-card-container" justify="center" align="middle">
                <Col>
                    <LoginBox />
                </Col>
            </Row>
        </BasicLayout>
    );
};
export default LoginPage;