import React from "react";

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-form';
import useMessage from "antd/es/message/useMessage";
import { Link, useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";

const LoginPage = () => {
    const message = useMessage();
    const navigate = useNavigate();

    return (
        <BasicLayout>
            <LoginFormPage>
                logo={<img src="../logo_white.png" alt="logo" />}
                title="Login"
                subTitle="欢迎登录电子书城"
                
                onFinish={async (values) => {
                    console.log(values);
                    const { username, password } = values;
                    if (username === 'admin' && password === 'admin') {
                        navigate('/home');
                    } else {
                        message.error('用户名或密码错误');
                    }
                }}
            </LoginFormPage>
        </BasicLayout>
    );
};
export default LoginPage;