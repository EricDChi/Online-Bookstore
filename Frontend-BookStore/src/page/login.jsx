import React, { useState } from "react";

import '../css/global.css';
import { Col, Row } from 'antd'; 
import { BasicLayout } from "../components/layout";
import { LoginBox } from "../components/login_box";
import { SignUpBox } from "../components/signup_box";

const LoginPage = () => {
    const [login, setLogin] = useState(true);

    const handleClick = async() => {
        setLogin(!login);
    }

    return (
        <BasicLayout>
            <Row justify="center" align="middle" style={{ minHeight:'70vh' }}>
                <Col>
                    {login && <LoginBox onMutate={handleClick} />}
                    {!login && <SignUpBox onMutate={handleClick} />}
                </Col>
            </Row>
        </BasicLayout>
    );
};
export default LoginPage;