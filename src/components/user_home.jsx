import { React, useState, useEffect } from 'react';
import { Col, Row, Typography, Divider, Space, Input, Button, DatePicker, message, Radio } from "antd";
import { setInfo } from '../service/user';
import AvatarUploader from './avatar_upload';
import dayjs from 'dayjs';

const { Paragraph } = Typography;
const { TextArea } = Input;

export default function UserHome ({user}) {
    const [userName, setUserName] = useState('');
    const [userSignature, setUserSignature] = useState('');
    const [userSex, setUserSex] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [userAddressee, setUserAddressee] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const setUserInfo = async() => {
        if(userName === '') {
            messageApi.error("昵称不能为空");
            return;
        }
        setInfo(userName, userSignature, userSex, userBirthday, userAddressee, userPhone, userAddress);
        messageApi.info("保存成功");
    }

    const handleUserName = (event) => { setUserName(event.target.value); }
    const handleUserSignature = (event) => { setUserSignature(event.target.value); }
    const handleUserBirthday = (date) => { setUserBirthday(date); } 
    const handleUserSex = (event) => { setUserSex(event.target.value); }
    const handleUserAddressee = (event) => { setUserAddressee(event.target.value); }
    const handleUserPhone = (event) => { setUserPhone(event.target.value); }
    const handleUserAddress = (event) => { setUserAddress(event.target.value); }

    useEffect(() => {
        setUserName(user?.nickname);
        setUserSignature(user?.signature);
        setUserSex(user?.sex);
        setUserBirthday(user?.birthday);
        setUserAddressee(user?.addressee);
        setUserPhone(user?.phone);
        setUserAddress(user?.address);
    }, [user])

    const saveButton = (
        <Button
            style={{
                height: '40px',
                width: '80px',
                borderRadius: '15px',
                backgroundColor: 'rgb(22, 119 , 255)',
                color: 'white'
            }}
            type = "button"
            onClick={setUserInfo}
        >

            保存
        </Button>
    );
    
    return <>
        {contextHolder}
        <Space size='middle'direction="vertical" style={{ width:'100%' }}>
            <Row>
                <Divider orientation="left">
                    我的信息
                </Divider>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>头像：</Paragraph>
                </Col>
                <Col span={20}>
                    <AvatarUploader/>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>昵称：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={1} 
                        key={user?.nickname} 
                        defaultValue={user?.nickname} 
                        placeholder={"你的昵称"} 
                        maxLength={10} 
                        status={(userName === '') && "error"}
                        onChange={handleUserName}
                        style={{ maxWidth:'200px', resize:'none' }}
                        allowClear
                    />
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>我的签名：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={6} 
                        key={user?.signature} 
                        defaultValue={user?.signature} 
                        placeholder="请输入你的签名" 
                        maxLength={200} 
                        onChange={handleUserSignature}
                        style={{ maxWidth:'500px', resize:'none' }}
                        allowClear
                        showCount
                    />
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    性别：
                </Col>
                <Col span={20}>
                    <Space size='middle'>
                        <Radio.Group key={user?.sex} 
                            defaultValue={user?.sex} 
                            value={userSex} 
                            onChange={handleUserSex}
                        >
                            <Radio.Button value="male">男</Radio.Button>
                            <Radio.Button value="female">女</Radio.Button>
                            <Radio.Button value="secrecy">保密</Radio.Button>
                        </Radio.Group>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    出生日期：
                </Col>
                <Col span={20}>
                    <DatePicker key={dayjs(user?.birthday)} 
                        defaultValue={dayjs(user?.birthday)}
                         onChange={handleUserBirthday}
                    />
                </Col>
            </Row>
            <Row>
                <Divider orientation="left">
                    默认收货信息
                </Divider>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>收件人：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={1} 
                        key={user?.addressee} 
                        defaultValue={user?.addressee} 
                        maxLength={10} 
                        onChange={handleUserAddressee}
                        style={{ maxWidth:'200px', resize:'none' }}
                        allowClear
                    />
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>电话号码：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={1} 
                        key={user?.phone} 
                        defaultValue={user?.phone} 
                        maxLength={11} 
                        onChange={handleUserPhone}
                        style={{ maxWidth:'200px', resize:'none' }}
                        allowClear
                    />
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>地址：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={2} 
                        key={user?.address} 
                        defaultValue={user?.address}  
                        maxLength={200} 
                        onChange={handleUserAddress}
                        style={{ maxWidth:'500px', resize:'none' }}
                        allowClear
                    />
                </Col>
            </Row>
            <Row>
                <Col offset={4}>
                    {saveButton}   
                </Col>        
            </Row>
        </Space>
    </>
}