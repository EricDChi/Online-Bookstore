import { useState } from 'react';
import {
    LockOutlined,
    UserOutlined,
    MailOutlined
} from '@ant-design/icons';
import "../css/login.css";
import { Button, Input, Space, message } from 'antd'; 
import { Link } from "react-router-dom";
import { handleBaseApiResponse } from '../utils/message.js';
import { signup } from '../service/signup.js';

export function SignUpBox ({ onMutate }){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reapeatPassword, setReapeatPassword] = useState('');
    const [email, setEmail] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const onSubmit = async() => {
        if (username === '' || password === '') {
            messageApi.error("账号或密码不能为空")
            return;
        }
        if (reapeatPassword !== password) {
            messageApi.error("两次输入密码不一致")
            return;
        }
        if (email === '' || !IsEmail(email)) {
            messageApi.error("邮箱格式不正确")
            return;
        }

        let res = await signup(username, password);
        handleBaseApiResponse(res, messageApi, onMutate);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleRepeatPassword = (event) => {
        setReapeatPassword(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const IsEmail = (email) => {
        const pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	    return pattern.test(email);
    }

    return <>
        {contextHolder}
        <div className="Login-box">
            <div>
                <h2>注册</h2>
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
                <Input size='large'
                    placeholder="请再次输入密码" 
                    status={(reapeatPassword !== password) && "error"}
                    prefix={<LockOutlined />}
                    onChange={handleRepeatPassword}
                /> 
                <Input size='large'
                    placeholder="请输入邮箱" 
                    status={((email === '') || !IsEmail(email)) && "error"}
                    prefix={<MailOutlined />}
                    onChange={handleEmail}
                /> 
            </Space>
            <Space className='button-box' direction='horizontal'>
                <Link onClick={onSubmit}>
                    <Button>
                        注册
                    </Button>
                </Link>
                <Link onClick={onMutate}>
                    <Button>
                        取消
                    </Button>
                </Link>
            </Space>
        </div>
    </>
}
