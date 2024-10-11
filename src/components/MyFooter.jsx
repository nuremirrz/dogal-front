import React from 'react';
import { Layout, Row, Col, Typography, Form, Input, Button } from 'antd';
import { InstagramOutlined,  FacebookOutlined, XOutlined, LinkedinOutlined, TikTokOutlined, SendOutlined } from '@ant-design/icons';
import '../styles/Footer.css'; // Импортируем CSS стили, если нужно

const { Footer } = Layout;
const { Text } = Typography;

const MyFooter = () => {
    return (
        <Footer className="footer border-2 border-orange-600 max-[360px]:mt-8" style={{ backgroundColor: '#ff6b00', color: '#FFFFFF' }}>
            <Row justify=" footer-block space-between" align="middle" style={{ padding: '20px 0' }}>
                <Col span={8}>
                    <Text className='text-4xl text-bold text-zinc-50 font-custom max-[360px]:text-2xl' strong>DOĞAL</Text>
                </Col>
                <Col className='footer__links' span={8} style={{ textAlign: 'center' }}>
                    <FacebookOutlined className='size-8' style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
                    <XOutlined className='size-8' style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
                    <InstagramOutlined className='size-8' style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
                    <TikTokOutlined className='size-8' style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
                    <SendOutlined className='size-8' style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
                    <LinkedinOutlined className='size-8' style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
                </Col>
                <Col span={8} style={{ textAlign: 'right' }}>
                    <Form className='footer__form' layout="inline" style={{ display: 'flex', gap:'5px' }}>
                        <Form.Item>
                            <Input className='footer__input' placeholder="Введите email" style={{ width: '200px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" style={{ backgroundColor: '#026a00', borderColor: '#ff6b00' }}>Подписаться</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Footer>
    );
};

export default MyFooter;
