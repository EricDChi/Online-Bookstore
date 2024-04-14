import {  Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar, { navbar } from "./navbar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMe, setMe } from "../service/user";

export function BasicLayout ({children}) {
    return (
        <Layout className="basic-layout">
            <Header className="header"><Navbar user={null}/></Header>
            <Content className="content">
                {children}
            </Content>
            <Footer className="footer">
                <Space direction="vertical">
                    <Link href="https://github.com/EricDChi/Online-Bookstore">github仓库</Link>
                    <div>电子书城</div>  
                </Space>
            </Footer>
        </Layout>
    );
}

export function PrivateLayout ({children}) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const checkLogin = async() => {
        let me = await getMe();
        if (!me) {
            navigate("/login");
        }
        else {
            setUser(me);
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <Layout className="basic-layout">
            <Header className="header"><Navbar user={user}/></Header>
            <Content className="content">
                {children}
            </Content>
            <Footer className="footer">
                <Space direction="vertical">
                    <Link href="https://github.com/EricDChi/Online-Bookstore">github仓库</Link>
                    <div>电子书城</div>  
                </Space>
            </Footer>
        </Layout>
    );
}