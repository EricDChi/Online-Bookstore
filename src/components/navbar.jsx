import { Col, Row, Dropdown, Button, Menu } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined,
    ShoppingCartOutlined,
    OrderedListOutlined
} from '@ant-design/icons';

export default function Navbar({user}) {
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const navItems = [
        { label: "首页", value: "/" },
        { label: "排行", value: "/rank" },
        { label: "分类", value: "/class" }
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));

    const usernavMenuItems = [
        { 
            key: "/cart", 
            label: "购物车",
            icon: <ShoppingCartOutlined /> 
        },
        { 
            key: "/orders",
            label: "订单",
            icon: <OrderedListOutlined />
        }
    ];

    const dropMenuItems = [
        {
            key: "nickname",
            label: user?.nickname,
            icon: <UserOutlined />,
        },
        {
            key: "password",
            label: "修改密码",
            icon: <FormOutlined />,
        },
        {
            key: "balance",
            label: `余额：${user?.balance / 100}元`,
            icon: <AccountBookOutlined />,
        },
        { key: "/logout", label: "登出", icon: <LogoutOutlined />, danger: true },
    ];

    return (
        <Row className="navbar" justify="start"> 
            {contextHolder}
            <Col>
                <Link to="/">电子书城</Link>
            </Col>
            <Col flex="auto">
                <Menu mode="horizontal"
                    items={navMenuItems}
                    defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            <Col>
                <Menu mode="horizontal"
                    items={usernavMenuItems}
                    defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            {user && <Col flex="auto">
                    <input type="text" placeholder="搜索书籍"></input>
                    <button>搜索</button>
            </Col>}
            {user && <Col>
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
                    <Button shape="circle" icon={<UserOutlined />} />
                </Dropdown>
            </Col>}
        </Row>
    );
}