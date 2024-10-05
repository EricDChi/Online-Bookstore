import { render } from "@testing-library/react";
import { Pagination, Table } from "antd";

export function StatisticsBookTable ({ books, current, pageSize, total, onPageChange }) {
    const columns = [
        { title: '书名', dataIndex: 'title', key: 'title', },
        { title: '数量', dataIndex: 'number', key: 'number', },
        { title: '金额', dataIndex: 'price', key: 'price', 
            render: (price) => price / 100
        },
    ];

    return <>
        <Table
            columns={columns}
            dataSource={books.map(book => ({
                ...book,
                key: book.title
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