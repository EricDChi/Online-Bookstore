import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "../css/login.css";
import { Button, Input, Space } from 'antd'; 
import { Link } from "react-router-dom";
import { login } from "../service/login";

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
                <Link onClick={login}>
                    <Button>
                        登录 
                    </Button>
                </Link>
                <Button>注册</Button>
            </Space>
        </div>
    );
}
