import { Column } from "@ant-design/charts";

export default function UserRankChart({ users }) {
    const data = users.map(user => ({
        consume: user.price / 100,
        nickname: user.nickname,
    }));
    const config = {
        data,
        xField: 'nickname',
        yField: 'consume',
        label: {
            position: 'top',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: true,
            },
        },
        meta: {
            nickname: {
                alias: '昵称',
            },
            consume: {
                alias: '消费额',
            },
        },
    };
    return <Column {...config} />;
}