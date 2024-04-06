import { Col, Row, Dropdown, Button, Menu, Image, Space, Input, ConfigProvider } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchProps } from 'antd/es/input/Search';

import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined,
    ShoppingCartOutlined,
    ReconciliationOutlined,
    SearchOutlined
} from '@ant-design/icons';

const onSearch = (value, _e, info) => console.log(info?.source, value);

export default function Navbar({user}) {
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const navItems = [
        { label: "首页", value: "/home" },
        { label: "排行", value: "/rank" },
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        label: <Link to={item.value}>{item.label}</Link>
    }));

    const usernavItems = [
        { value: "/cart", label: "购物车", icon: <ShoppingCartOutlined /> },
        { value: "/orders", label: "订单", icon: <ReconciliationOutlined />}
    ];
    const usernavMenuItems = usernavItems.map(item => ({
        key: item.value,
        icon: item.icon,
        label: <Link to={item.value} >{item.label}</Link>
    }));

    const dropMenuItems = [
        {
            key: "nickname",
            label: <Link to={"/myhome"}></Link>,
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
        {   
            key: "/logout", 
            label: "登出", 
            icon: <LogoutOutlined />, 
            danger: true 
        },
    ];

    return (
        <Row className="navbar" justify="center" align="middle"> 
            <Col className='navbar-col' span={3}>
                <Image
                    preview={false}
                    width={40}
                    height={40}
                    src="../../logo_white.png"
                />  
                <Link className="title" to="/home">电子书城</Link>
            </Col>
            <Col className='navbar-col' span={4}>
                <Menu mode="horizontal"
                    items={navMenuItems}
                    theme='dark'
                    defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]}
                />
            </Col>
            {!user && <Col className='navbar-col' span={16} />}
            {user && <Col className='navbar-col' span={10} style={{ height:40 }} align="center">
                <Input.Search className='search-input'
                    placeholder="输入关键词"
                    allowClear
                    enterButton="搜索"
                    onSearch={onSearch}
                    size='large'
                    suffix={<SearchOutlined />}
                    style={{ maxWidth: 500, minWidth: 200 }}
                />
            </Col>}
            {user && <Col className='navbar-col' span={4} offset={2}>
                <Menu className='user-menu' 
                    mode="horizontal"
                    items={usernavMenuItems}
                    theme='dark'
                    defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]}
                    style={{  }}
                />
            </Col>}
            {user && <Col className='navbar-col' span={1}>
                <Dropdown menu={{ items: dropMenuItems }}>
                    <Link to="/myhome">
                        <Button shape="circle" icon={<UserOutlined />} />
                    </Link>
                </Dropdown>
            </Col>}
        </Row>
    );
}