import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import useMessage from "antd/es/message/useMessage";
import "../css/login.css";
import { Col, Row, Image, Typography, Button, Input, Space } from 'antd'; 
import { Link, useNavigate } from "react-router-dom";

export function LoginBox (){
    return (
        <div className="Login-box">
            <div className="login-title">
                <img src="../logo.png" alt=""></img>
                <h2>电子书城</h2>
            </div>
            <Space size='middle' className='input-box' direction="vertical">
                <Input size='large' 
                    placeholder="input account" 
                    prefix={<UserOutlined />} 
                    allowClear
                />
                <Input.Password placeholder="input password" 
                    prefix={<LockOutlined />}
                    size='large'
                /> 
            </Space>
            <Link href="#">忘记密码？</Link>
            <Space className='button-box' direction='horizontal'>
                <Link to="/home">
                    <Button>
                        登录 
                    </Button>
                </Link>
                <Button>注册</Button>
            </Space>
        </div>
    );
}
