import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Pagination, Popconfirm, Table, Typography, Upload, message } from 'antd';
import { render } from '@testing-library/react';
import { IMAGE_PREFIX } from '../service/common';
import { handleBaseApiResponse } from '../utils/message';
import { deleteBook, updateBook } from '../service/book';

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

export default function BookTable({ books, onMutate, current, pageSize, total, onPageChange }) {
    const [form] = Form.useForm();
    const [items, setItems] = useState(books.items);
    const [editingKey, setEditingKey] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [newCover, setNewCover] = useState('');
    const isEditing = (record) => record.id === editingKey;

    useEffect(() => {
        setItems(books);
    }, [books]);

    const edit = (record) => {
        form.setFieldsValue({
            title: '',
            author: '',
            ISBN: '',
            ...record,
        });
        setNewCover(record.cover);
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const handleChange = async (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        setNewCover(e?.fileList[0]);
        return e?.fileList;
    }

    const saveBook = async (book) => {
        let res = await updateBook(book);
        handleBaseApiResponse(res, messageApi);
    }

    const save = async (id) => {
        try {
            let row = await form.validateFields();
            row.cover = newCover.response.data.name;
            const newItems = [...items];
            const index = newItems.findIndex((item) => id === item.id);
            
            if (index > -1) {
                const item = newItems[index];
                Object.keys(item).forEach(key => {
                    if (!(key in row)) {
                        row[key] = item[key];
                    }
                });
                newItems.splice(index, 1, {
                    ...item,
                    ...row,
                });
                console.log(row);
                saveBook(newItems.at(index));
                setItems(newItems);
                setEditingKey('');
            } else {
                newItems.push(row);
                setItems(newItems);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async (id) => {
        console.log(id);
        let res = await deleteBook(id);
        handleBaseApiResponse(res, messageApi);
        onMutate();
    }
    
    const columns = [
        {
            title: '书名',
            dataIndex: 'title',
            key: 'book_title',
            width: '20%',
            editable: true,
        },
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'book_cover',
            width: '20%',
            render: (cover, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <Upload Upload name="picture" action="http://localhost:8080/api/upload" listType="picture" maxCount={1} onChange={handleChange}>
                        <img src={IMAGE_PREFIX + "/" + cover} alt="cover" style={{width: '100px'}} />
                    </Upload>
                ) : (
                    <img src={IMAGE_PREFIX + "/" + cover} alt="cover" style={{width: '100px'}} />
                );
            },
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'book_author',
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
            key: 'book_operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.id)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            编辑更多
                        </Typography.Link>
                        <Typography.Link
                            onClick={() => save(record.id)}
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
                    <span>
                        <Typography.Link disabled={editingKey !== ''} 
                            onClick={() => edit(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            编辑
                        </Typography.Link>
                        <Popconfirm title="确定要删除吗？" 
                            cancelText={"取消"} 
                            okText={"确认"} 
                            onConfirm={() => handleDelete(record.id)}
                            onCancel={cancel}
                        >
                            <a style={{ color: 'red' }}>删除</a>
                        </Popconfirm>
                    </span>
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

    return <>
        {contextHolder}
        <Form form={form} component={false}>
            <Table
                components={{
                body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={items}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
            />
        </Form>
        <Pagination 
            current={current} 
            pageSize={pageSize} 
            total={total} 
            onChange={onPageChange}
            style={{ marginTop: "20px", float: "right"}}
        />
    </>
};