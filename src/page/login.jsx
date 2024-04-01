import React from "react";

import '../css/global.css';
import useMessage from "antd/es/message/useMessage";
import { Col, Row, Image, Typography} from 'antd'; 
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";
import { LoginBox } from "../components/login_box";
const Title = Typography;

const LoginPage = () => {
    const message = useMessage();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = React.useState(false);

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