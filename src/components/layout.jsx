import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar, { navbar } from "./navbar";
import { useState } from "react";
import { Link } from "react-router-dom";

export function BasicLayout ({children}) {
    return (
        <Layout>
            <Header className="header"><Navbar user={null}/></Header>
            <Content className="content">
                {children}
            </Content>
            <Footer className="footer">
                <Space style="vertical">
                    <Link target="_blank" to="https://github.com/EricDChi/Online-Bookstore">github仓库</Link>
                    <div>电子书城</div>  
                </Space>
            </Footer>
        </Layout>
    );
}

export function PrivateLayout ({children}) {
    const[user, setUser] = useState(null);

    return (
        <Layout>
            <Header className="header"><Navbar user={user}/></Header>
            <Content className="content">
                {children}
            </Content>
            <Footer className="footer">
                <Space style="vertical">
                    <Link target="_blank" to="https://github.com/EricDChi/Online-Bookstore">github仓库</Link>
                    <div>电子书城 REINS 2024</div>  
                </Space>
            </Footer>
        </Layout>
    );
}