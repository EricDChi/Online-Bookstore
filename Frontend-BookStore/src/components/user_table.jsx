import { Table, Checkbox, message, Popconfirm, Pagination } from "antd";
import { useEffect, useState } from "react";
import { forbidUser } from "../service/user";
import { handleBaseApiResponse } from "../utils/message";

export function UserTable ({ users, current, pageSize, total, onPageChange }) {
    const [checked, setChecked] = useState([true]);
    const [messageApi, contextHolder] = message.useMessage();

    const forbid = async (id, forbidden) => {
        let res = await forbidUser(id, forbidden);
        handleBaseApiResponse(res, messageApi);
    }
    const onChange = (e) => {
        const newChecked = checked.map((item, index) => {
            if (index === e.target.id) {
                forbid(index, !item);
                return !item;
            }
            return item;
        });
        setChecked(newChecked);
    };

    const columns = [
        {
            width: 100,
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            width: 200,
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            width: 200,
            title: `权限`,
            dataIndex: 'role',
            key: 'role',
            render: role => role === 1 ? '管理员' : '用户'
        },
        {
            width: 200,
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: status => status === false ? '正常' : '封禁'
        },
        {
            title: '禁用',
            dataIndex: '',
            key: 'action',
            render: (item) => <>
                {checked[item.id] ? 
                    <Checkbox id={item.id} checked={checked[item.id]} disabled={item.role === 1} onChange={onChange}>
                        {"封禁中"}
                    </Checkbox>
                    :
                    <Popconfirm title="确定要封禁用户吗">
                        <Checkbox id={item.id} checked={checked[item.id]} disabled={item.role === 1} onChange={onChange}>
                            {"正常使用"}
                        </Checkbox>
                    </Popconfirm>
                }
            </>,
        },
    ];

    useEffect(() => {
        let newChecked = [];
        users.map((user) => {
            newChecked[user.id] = user.status;
            return user;
        });
        setChecked(newChecked);
    }, [users]);

    return <>
        {contextHolder}
        <Table
            columns={columns}
            dataSource={users.map(item => ({
                ...item,
                key: item.id
            }))}
            pagination={false}
        />
        <Pagination
            current={current} 
            pageSize={pageSize} 
            total={total} 
            onChange={onPageChange}
            style={{ marginTop: "20px", float: "right"}}
        />
    </>
}