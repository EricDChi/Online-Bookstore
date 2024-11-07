import { Button, Form, Input, Modal, Spin } from "antd";
import useMessage from "antd/es/message/useMessage";
import { BillTable } from "./bill_table";
import { handleBaseApiResponse } from "../utils/message";
import { placeOrder } from "../service/order";
import { getSocket } from "../utils/websocket";
import { useState, useEffect } from "react";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { wait } from "@testing-library/user-event/dist/utils";
import { getTotalPrice } from "../service/book";

const { TextArea } = Input;

export default function PlaceOrderModal({
    selectedItems,
    user,
    onOk,
    onCancel,
}) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();
    const socket = getSocket();
    const [loading, setLoading] = useState(false); 
    const [isSuccess, setIsSuccess] = useState(false); 
    const [countdown, setCountdown] = useState(5); 

    useEffect(() => {
        if (isSuccess && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setIsSuccess(false);
            onOk();
        }
    }, [isSuccess, countdown, onOk]);
    
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
    
    const onSuccess = async () => {
        // await sleep(1000);
        setIsSuccess(true); 
        setCountdown(5); 
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                console.log('Received message:', event.data);
                if (event.data === "pong") return; // 忽略心跳消息

                handleBaseApiResponse(
                    JSON.parse(event.data),
                    messageApi,
                    onSuccess()
                );
            };
        }
    }, [socket, messageApi]);

    const computeTotalPrice = async() => {
        return selectedItems.reduce((total, item) => {
            // return total + item.book.price * item.number;
            return total + getTotalPrice(item.number, item.book.price);
        }, 0);
    };

    const handleSubmit = async ({ address, addressee, phone }) => {
        if (!address || !addressee || !phone) {
            messageApi.error("请填写完整信息！");
            return;
        }

        const orderInfo = {
            address,
            addressee,
            phone,
            price: computeTotalPrice(),
            items: selectedItems,
        };

        console.log(orderInfo);

        setLoading(true); // 开始 loading 状态
        const res = await placeOrder(orderInfo); // 调用下单接口
        console.log(res.message);

        if (!res.ok) {
            setLoading(false); // 停止 loading
            messageApi.error(res.message);
            onCancel(); // 关闭 Modal
        }
    };

    return (
        <Modal
            title={
                isSuccess
                    ? `下单成功！${countdown}秒后关闭`
                    : "确认下单"
            }
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {loading ? (
                <div style={{ textAlign: "center", padding: "50px 0" }}>
                    {isSuccess ? (
                        <CheckCircleOutlined style={{ fontSize:'80px', color:'#52c41a' }}/>
                    ) : (
                        <LoadingOutlined style={{ fontSize:'80px', color:'#1890ff' }}/>
                    )}
                </div>
            ) : (
                <>
                    <BillTable
                        selectedItems={selectedItems}
                        total_price={computeTotalPrice()}
                    />
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        preserve={false}
                        initialValues={{
                            addressee: user?.addressee,
                            phone: user?.phone,
                            address: user?.address,
                        }}
                    >
                        {contextHolder}
                        <Form.Item
                            name="addressee"
                            label="收货人"
                            required
                        >
                            <Input key={user?.addressee} />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="联系电话"
                            required
                        >
                            <Input key={user?.phone} />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label="收货地址"
                            required
                        >
                            <TextArea rows={2} maxLength={817} key={user?.address} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </Modal>
    );
}
