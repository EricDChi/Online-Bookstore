import { Layout } from "antd";
import Navbar, { navbar } from "./navbar";
import { Content, Header } from "antd/es/layout/layout";
import { useState } from "react";

export default function BasicLayout ({children}) {
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

export default function PrivateLayout ({children}) {
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