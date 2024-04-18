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
    const [userBirthday, setUserBirthday] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    const setUserInfo = async() => {
        setInfo(userName, userSignature, userSex, userBirthday);
        messageApi.info("保存成功");
    }

    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handleUserSignature = (event) => {
        setUserSignature(event.target.value);
    }

    const handleUserBirthday = (date) => {
        setUserBirthday(date);
    }

    const handleUserSex = (event) => {
        setUserSex(event.target.value);
    }

    useEffect(() => {
        setUserName(user?.nickname);
        setUserSignature(user?.signature);
        setUserSex(user?.sex);
        setUserBirthday(user?.birthday);
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
                    <TextArea rows={1} key={user?.nickname} defaultValue={user?.nickname} placeholder={"你的昵称"} maxLength={10} onChange={handleUserName}
                        style={{ maxWidth:'200px', resize:'none' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>我的签名：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={6} key={user?.signature} defaultValue={user?.signature} placeholder="请输入你的签名" maxLength={200} onChange={handleUserSignature}
                        style={{ maxWidth:'500px', resize:'none' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    性别：
                </Col>
                <Col span={20}>
                    <Space size='middle'>
                        <Radio.Group key={user?.sex} defaultValue={user?.sex} value={userSex} onChange={handleUserSex}>
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
                    <DatePicker key={dayjs(user?.birthday)} defaultValue={dayjs(user?.birthday)} onChange={handleUserBirthday}/>
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