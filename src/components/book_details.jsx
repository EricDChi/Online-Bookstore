import { ROW, COL } from antd;
import { Typography, Divider } from "antd";
const { Title, Paragraph, Text } = Typography;

export default function BookDetails({ book }) {
    return (
      <ROW>
        <COL span={9}>
            <Image src="../book1.png" alt=""></Image>
        </COL>
        <COL span={15}>
          <Typography>
            <Title>C++ Primer 中文版（第 5 版）</Title>
            <Title level={4}>售价</Title>
            <Text>¥57.5</Text>
            <Title level={4}>作者</Title>
            <Text>[美] Stanley B. Lippman / [美] Josée Lajoie / [美]</Text>
            <Title level={4}>出版社</Title>
            <Text>电子工业出版社</Text>
          </Typography>
        </COL>
      </ROW>
    );
}