import { Row, Col, Image, Button } from "antd";
import { Typography, Divider } from "antd";
const { Title, Paragraph, Text } = Typography;

export default function BookDetails({ book }) {
    return (
      <Row>
        <Col span={9}>
            <Image src="../book1.png" alt=""></Image>
        </Col>
        <Col span={15}>
            <Title level={3}>C++ Primer 中文版（第 5 版）</Title>
            <Row className='price-box'>
              <Paragraph className='text'>售价</Paragraph>
              <Paragraph className='price symbol'>¥</Paragraph>
              <Paragraph className='price'>57.5</Paragraph>
            </Row>
            <Paragraph>作者：[美] Stanley B. Lippman / [美] Josée Lajoie / [美]</Paragraph>
            <Paragraph>出版社：电子工业出版社</Paragraph>
            <Paragraph>销量：8</Paragraph>
            <Row className='button-box'>
              <Button className='button-buy'>立即购买</Button>
              <Button className='button-cart'>加入购物车</Button>
            </Row>
        </Col>
      </Row>
    );
}