import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import useMessage from "antd/es/message/useMessage";
import { handleBaseApiResponse } from "../utils/message";
import { UploadOutlined } from '@ant-design/icons';
import { IMAGE_PREFIX } from "../service/common";
import { addBook } from "../service/book";

const { TextArea } = Input;

export default function PlaceBookModal ({
    book,
    onOk,
    onCancel }) {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList[0].response?.data.name;
    };

    const handleSubmit = async (values) => {
        values.price = values.price * 100;
        if (!values.title || !values.cover || !values.isbn || !values.price || !values.stock) {
            messageApi.error("请填写完整信息！");
            return;
        }
        console.log(values);
        let res = await addBook(values);
        handleBaseApiResponse(res, messageApi, onOk);
    };

    return (
        <Modal
            title={book === null ? "上传图书" : "修改图书"}
            open
            onOk={onOk}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                preserve={false}
                initialValues={{id: book?.id, title: book?.title, cover: book?.cover, author: book?.author, isbn: book?.isbn, price: book?.price / 100, publisher: book?.publisher, stock: book?.stock, bookDescription: book?.bookDescription, authorDescription: book?.authorDescription}}
            >
                {contextHolder}
                <Form.Item
                    name="id"
                    hidden
                />
                <Form.Item
                    name="title"
                    label="书名"
                    required
                >
                    <Input key={book?.title}/>
                </Form.Item>
                <Form.Item
                    name="cover"
                    label="封面"
                    required
                    getValueFromEvent={normFile}
                >
                    <Upload Upload name="picture" action="http://localhost:8080/api/upload" listType="picture" maxCount={1}>
                        {book === null || book?.cover === "" ? (
                            <Button icon={<UploadOutlined />}>上传封面</Button> 
                            ) : (
                            <img src={IMAGE_PREFIX + "/" + book?.cover} alt="cover" style={{width: '100px'}} />
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="author"
                    label="作者"
                >
                    <Input key={book?.author}/>
                </Form.Item>
                <Form.Item
                    name="isbn"
                    label="ISBN编号"
                    required
                >
                    <TextArea rows={2} maxLength={817} key={book?.isbn}/>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="价格"
                    required
                >
                    <InputNumber precision={2} key={book?.price}/>
                </Form.Item>
                <Form.Item
                    name="publisher"
                    label="出版社"
                >
                    <TextArea rows={2} maxLength={817} key={book?.publisher}/>
                </Form.Item>
                <Form.Item
                    name="stock"
                    label="库存"
                    required
                >
                    <InputNumber key={book?.stock}/>
                </Form.Item>
                <Form.Item
                    name="bookDescription"
                    label="书籍描述"
                >
                    <TextArea rows={2} maxLength={817} key={book?.bookDescription}/>
                </Form.Item>
                <Form.Item
                    name="authorDescription"
                    label="作者描述"
                >
                    <TextArea rows={2} maxLength={817} key={book?.authorDescription}/>
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