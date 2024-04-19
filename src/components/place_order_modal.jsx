import { Button, Form, Input, Modal } from "antd";
import React from "react";
import useMessage from "antd/es/message/useMessage";
import { BillTable } from "./bill_table";

const { TextArea } = Input;

export default function PlaceOrderModal ({
    selectedItems,
    user,
    onOk,
    onCancel }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const handleSubmit = async ({ address, addressee, phone }) => {
        if (!address || !addressee || !phone) {
            messageApi.error("请填写完整信息！");
            return;
        }
        messageApi.info("购买成功");
        setTimeout(() => onCancel(), 1000);
    };

    return (
        <Modal
            title={"确认下单"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <BillTable selectedItems={selectedItems}/>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
            >
                {contextHolder}
                <Form.Item
                    name="addressee"
                    label="收货人"
                    required
                >
                    <Input key={user?.addressee} defaultValue={user?.addressee} />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="联系电话"
                    required
                >
                    <Input key={user?.phone} defaultValue={user?.phone} />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="收货地址"
                    required
                >
                    <TextArea rows={2} maxLength={817} key={user?.address} defaultValue={user?.address} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};