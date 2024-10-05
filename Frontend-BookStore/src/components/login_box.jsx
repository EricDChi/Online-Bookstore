import { useState } from 'react';
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../css/login.css";
import { Button, Input, Space, message } from 'antd'; 
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/login.js";
import { handleBaseApiResponse } from '../utils/message.js';

export function LoginBox ({ onMutate }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onSubmit = async() => {
        if (username === '' || password === '') {
            messageApi.error("账号或密码不能为空")
            return;
        }

        let res = await login(username, password);
        handleBaseApiResponse(res, messageApi, () => navigate("/"));
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    return <>
        {contextHolder}
        <div className="Login-box">
            <div className="login-title">
                <img src="../logo.png" alt=""></img>
                <h2>电子书城</h2>
            </div>
            <Space size='middle' className='input-box' direction="vertical">
                <Input size='large'
                    placeholder="请输入用户名" 
                    status={(username === '') && "error"}
                    prefix={<UserOutlined />} 
                    onChange={handleUsername}
                    allowClear
                />
                <Input.Password size='large'
                    name="password"
                    placeholder="请输入密码" 
                    status={(password === '') && "error"}
                    prefix={<LockOutlined />}
                    onChange={handlePassword}
                /> 
            </Space>
            <Link href="#">忘记密码？</Link>
            <Space className='button-box' direction='horizontal'>
                <Link onClick={onSubmit}>
                    <Button>
                        登录 
                    </Button>
                </Link>
                <Link onClick={onMutate}>
                    <Button>
                        注册
                    </Button>
                </Link>
            </Space>
        </div>
    </>
}
