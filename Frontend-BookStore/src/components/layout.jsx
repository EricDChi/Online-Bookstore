import {  Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Navbar, VerticalHeader, VerticalNavbar } from "./navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../service/user";
import Sider from "antd/es/layout/Sider";

export function BasicLayout ({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                <Navbar user={null}/>
            </Header>
            <Content className="content">
                {children}
            </Content>
            <Footer className="footer">
                <Space direction="vertical">
                    <a href="https://github.com/EricDChi/Online-Bookstore">github仓库</a>
                    <div>电子书城</div>  
                </Space>
            </Footer>
        </Layout>
    );
}

export function PrivateLayout ({ children }) {
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
            <Header className="header"
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                }}
            >
                <Navbar user={user}/>
            </Header>
            <Content className="content">
                {user && children}
            </Content>
            <Footer className="footer">
                <Space direction="vertical">
                    <a href="https://github.com/EricDChi/Online-Bookstore">github仓库</a>
                    <div>电子书城</div>  
                </Space>
            </Footer>
        </Layout>
    );
}

// export function VerticalLayout ({children}) {
//     const [user, setUser] = useState(null);
//     const navigate = useNavigate();

//     const checkLogin = async() => {
//         let me = await getMe();
//         if (!me) {
//             navigate("/login");
//         }
//         else {
//             setUser(me);
//         }
//     }

//     useEffect(() => {
//         checkLogin();
//     }, []);

//     return (
//         <Layout className="basic-layout">
//             <Layout>
//                 <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
//                     <VerticalNavbar />
//                 </Sider>
//                 <Layout style={{ marginLeft: 190 }}>
//                     <Header className="header"
//                         style={{
//                             position: 'sticky',
//                             top: 0,
//                             zIndex: 1,
//                         }}
//                     >
//                         <VerticalHeader user={user}/>
//                     </Header>
//                     <Content className="content">
//                         {children}
//                     </Content>
//                     <Footer className="footer">
//                             <a href="https://github.com/EricDChi/Online-Bookstore">github仓库</a>
//                             <div>电子书城</div>  
//                     </Footer>
//                 </Layout>
//             </Layout>
//         </Layout>
//     );
// }