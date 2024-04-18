import { useState } from 'react';
import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../css/login.css";
import { Button, Input, Space, message } from 'antd'; 
import { Link, useNavigate } from "react-router-dom";
import { login } from "../service/login";

export function LoginBox (){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onSubmit = async() => {
        let res = await login(username, password);
        if (res === true) {
            messageApi.info("登录成功");
            navigate('/');
        }
        else {
            messageApi.error("密码错误");
        }
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
                    placeholder="input account" 
                    prefix={<UserOutlined />} 
                    onChange={handleUsername}
                    allowClear
                />
                <Input.Password placeholder="input password" 
                    prefix={<LockOutlined />}
                    onChange={handlePassword}
                    size='large'
                /> 
            </Space>
            <Link href="#">忘记密码？</Link>
            <Space className='button-box' direction='horizontal'>
                <Link onClick={onSubmit}>
                    <Button>
                        登录 
                    </Button>
                </Link>
                <Button>注册</Button>
            </Space>
        </div>
    </>
}
