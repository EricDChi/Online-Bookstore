import { Table, Checkbox, message } from "antd";
import { useEffect, useState } from "react";
import { forbidUser } from "../service/user";
import { handleBaseApiResponse } from "../utils/message";

export function UserTable ({ books }) {
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
            width: 200,
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
            width: 300,
            title: `权限`,
            dataIndex: 'role',
            key: 'role',
            render: role => role === 1 ? '管理员' : '用户'
        },
        {
            title: '禁用',
            dataIndex: '',
            key: 'action',
            render: (item) => <Checkbox id={item.id} checked={checked[item.id]} disabled={item.role === 1} onChange={onChange}>
                {checked[item.id] ? "封禁中" : "正常使用"}
            </Checkbox>,
        },
    ];

    useEffect(() => {
        let newChecked = [];
        users.map((user) => {
            newChecked[user.id] = user.forbidden;
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
        />
    </>
}