import React, { useState } from 'react';
import { Col, Row, Typography, Divider, Space, Input, Button, DatePicker, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;
const { TextArea } = Input;

export default function UserHome () {
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState(false);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

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
        >

            保存
        </Button>
    );
    
    return <>
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
                    <Upload
                        name="avatar"
                        listType="picture-circle"
                        className="avatar-uploader"
                        showUploadList={false}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{
                                    width: '100%',
                                }}
                            />
                            ) : (
                            uploadButton
                        )}
                    </Upload>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>昵称：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={1} placeholder="你的昵称" maxLength={10} 
                        style={{ maxWidth:'200px', resize:'none' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    <Paragraph>我的签名：</Paragraph>
                </Col>
                <Col span={20}>
                    <TextArea rows={6} placeholder="请输入你的签名" maxLength={200} 
                            style={{ maxWidth:'500px', resize:'none' }}/>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    性别：
                </Col>
                <Col span={20}>
                    <Space size='middle'>
                        <Button>男</Button>
                        <Button>女</Button>
                        <Button>保密</Button>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={2} offset={2}>
                    出生日期：
                </Col>
                <Col span={20}>
                    <DatePicker onChange={onChange} />
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