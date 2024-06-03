import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Upload } from 'antd';
import { render } from '@testing-library/react';
import { IMAGE_PREFIX } from '../service/common';

const originData = [];

for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}
   
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                        required: true,
                        message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default function BookTable({books}) {
    const [form] = Form.useForm();
    const [data, setData] = useState(books.items);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;

    useEffect(() => {
        setData(books.items);
    }, [books]);

    const edit = (record) => {
        form.setFieldsValue({
            title: '',
            author: '',
            ISBN: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    
    const columns = [
        {
            title: '书名',
            dataIndex: 'title',
            key: 'title',
            width: '20%',
            editable: true,
        },
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            width: '20%',
            render: (cover, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Upload Upload name="picture" action="http://localhost:8080/api/upload" listType="picture" maxCount={1}>
                        <img src={IMAGE_PREFIX + "/" + cover} alt="cover" style={{width: '100px'}} />
                    </Upload>
                ) : (
                    <img src={IMAGE_PREFIX + "/" + cover} alt="cover" style={{width: '100px'}} />
                );
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            width: '20%',
            editable: true,
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
            width: '20%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                        >
                            编辑更多
                        </Typography.Link>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            保存
                        </Typography.Link>
                        <Popconfirm title="确定要取消编辑吗？" cancelText={"取消"} okText={"确认"} onConfirm={cancel}>
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        编辑
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};