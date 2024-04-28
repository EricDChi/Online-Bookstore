import { Col, Row, Dropdown, Menu, Image, Input, Avatar, message } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    LogoutOutlined,
    UserOutlined,
    AccountBookOutlined,
    FormOutlined,
    ShoppingCartOutlined,
    ReconciliationOutlined,
    SearchOutlined,
    HomeOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import { logout } from '../service/logout';
import { handleBaseApiResponse } from '../utils/message';
import { IMAGE_PREFIX } from '../service/common';

export function Navbar({user}) {
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation();
    const navigate = useNavigate();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];
    const navItems = [
        { label: "首页", value: "/" },
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

    const handleMenuClick = async (event) => {
        if (event.key === "/logout") {
            let res = await logout();
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            return;
        }
    };

    const handleSearch = (keyword) => {
        navigate (`/search/${keyword}`);
    }

    const dropMenuItems = [
        {
            key: "nickname",
            label: <Link to={"/myhome"}>{user?.nickname}</Link>,
            icon: <UserOutlined />,
        },
        {
            key: "password",
            label: "修改密码",
            icon: <FormOutlined />,
        },
        {
            key: "balance",
            label: `余额：${user?.balance}元`,
            icon: <AccountBookOutlined />,
        },
        {   
            key: "/logout", 
            label: "登出", 
            icon: <LogoutOutlined />, 
            danger: true 
        },
    ];

    return <>
        {contextHolder}
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
                    onSearch={handleSearch}
                    size='large'
                    suffix={<SearchOutlined />}
                    style={{ maxWidth: 400, minWidth: 100 }}
                />
            </Col>}
            {user && <Col className='navbar-col' span={4} offset={1.5}>
                <Menu className='user-menu' 
                    mode="horizontal"
                    items={usernavMenuItems}
                    theme='dark'
                    defaultSelectedKeys={[selectedKey]}
                    selectedKeys={[selectedKey]}
                    style={{  }}
                />
            </Col>}
            {user && <Col className='navbar-col' span={1} offset={0.5}>
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
                    <Link to="/myhome">
                        <Avatar shape="circle" src={<img src={IMAGE_PREFIX + "/" + user?.avatar} alt="avatar" />}/>
                    </Link>
                </Dropdown>
            </Col>}
        </Row>
    </>
}

export function VerticalHeader({user}) {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleMenuClick = async (event) => {
        if (event.key === "/logout") {
            let res = await logout();
            handleBaseApiResponse(res, messageApi, () => navigate("/login"));
            return;
        }
    };

    const handleSearch = (keyword) => {
        navigate (`/search/${keyword}`);
    }

    const dropMenuItems = [
        {
            key: "nickname",
            label: <Link to={"/myhome"}>{user?.nickname}</Link>,
            icon: <UserOutlined />,
        },
        {
            key: "password",
            label: "修改密码",
            icon: <FormOutlined />,
        },
        {
            key: "balance",
            label: `余额：${user?.balance}元`,
            icon: <AccountBookOutlined />,
        },
        {   
            key: "/logout", 
            label: "登出", 
            icon: <LogoutOutlined />, 
            danger: true 
        },
    ];

    return <>
        {contextHolder}
        <Row className="navbar" justify="center" align="middle"> 
            {!user && <Col className='navbar-col' span={17}/>}
            {user && <Col className='navbar-col' span={10} offset={7} style={{ height:40 }} align="center">
                <Input.Search className='search-input'
                    placeholder="输入关键词"
                    allowClear
                    enterButton="搜索"
                    onSearch={handleSearch}
                    size='large'
                    suffix={<SearchOutlined />}
                    style={{ maxWidth: 400, minWidth: 100 }}
                />
            </Col>}
            {user && <Col className='navbar-col' span={1} offset={6}>
                <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
                    <Link to="/myhome">
                        <Avatar shape="circle" src={<img src={user?.avatar} alt="avatar" />}/>
                    </Link>
                </Dropdown>
            </Col>}
        </Row>
    </>
}

export function VerticalNavbar() {
    const location = useLocation();
    const parts = location.pathname.split('/');
    const selectedKey = '/' + parts[parts.length - 1];

    const navItems = [
        { value: "/", label: "首页", icon: <HomeOutlined /> },
        { value: "/rank", label: "排行", icon: <BarChartOutlined /> },
        { value: "/cart", label: "购物车", icon: <ShoppingCartOutlined /> },
        { value: "/orders", label: "订单", icon: <ReconciliationOutlined />}
    ];
    const navMenuItems = navItems.map(item => ({
        key: item.value,
        icon: item.icon,
        label: <Link to={item.value} >{item.label}</Link>
    }));

    return (
        <div>
            <Col className='navbar' style={{ marginTop: 20, marginLeft: 10 }}>
                <Image
                    preview={false}
                    width={40}
                    height={40}
                    src="../../logo_white.png"
                />  
                <Link className="title" to="/home">电子书城</Link>
            </Col>
            <Menu
                mode='inline'
                items={navMenuItems}
                theme='dark'
                defaultSelectedKeys={[selectedKey]}
                selectedKeys={[selectedKey]}
            />
        </div>
    );
}