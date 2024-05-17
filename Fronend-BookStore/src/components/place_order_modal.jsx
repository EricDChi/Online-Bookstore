import { Button, Form, Input, Modal } from "antd";
import useMessage from "antd/es/message/useMessage";
import { BillTable } from "./bill_table";
import { handleBaseApiResponse } from "../utils/message";
import { placeOrder } from "../service/order";

const { TextArea } = Input;

export default function PlaceOrderModal ({
    selectedItems,
    user,
    onOk,
    onCancel }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const computeTotalPrice = () => {
        let total_price = 0;
        for (const item of selectedItems) {
            total_price += item.book.price * item.number;
        }
        return total_price;
    }

    const handleSubmit = async ({ address, addressee, phone }) => {
        if (!address || !addressee || !phone) {
            messageApi.error("请填写完整信息！");
            return;
        }
        let orderInfo = {
            address,
            addressee,
            phone,
            price: computeTotalPrice(),
            items: selectedItems
        }
        let res = await placeOrder(orderInfo);
        handleBaseApiResponse(res, messageApi, onOk);
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
            <BillTable selectedItems={selectedItems} total_price={computeTotalPrice()} />
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
                initialValues={{ addressee: user?.addressee, phone: user?.phone, address: user?.address }}
            >
                {contextHolder}
                <Form.Item
                    name="addressee"
                    label="收货人"
                    required
                >
                    <Input key={user?.addressee}/>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="联系电话"
                    required
                >
                    <Input key={user?.phone}/>
                </Form.Item>
                <Form.Item
                    name="address"
                    label="收货地址"
                    required
                >
                    <TextArea rows={2} maxLength={817} key={user?.address}/>
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