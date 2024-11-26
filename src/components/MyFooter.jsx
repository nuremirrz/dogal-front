import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Form, Input, Button, message } from 'antd';
import { InstagramOutlined, FacebookOutlined, XOutlined, LinkedinOutlined, TikTokOutlined, SendOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../styles/Footer.css'; // Импортируем CSS стили

const { Footer } = Layout;
const { Text } = Typography;

const MyFooter = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!email) {
            return message.warning('Введите email');
        }

        setLoading(true); // Включаем индикатор загрузки
        try {
            const response = await axios.post('/api/subscribers/subscribe', { email });
            message.success(response.data.message || 'Вы успешно подписались!');
            setEmail(''); // Очистка поля ввода
        } catch (error) {
            message.error(error.response?.data?.message || 'Ошибка при подписке. Попробуйте ещё раз.');
            setEmail('')
        } finally {
            setLoading(false); // Выключаем индикатор загрузки
        }
    };

    return (
        <Footer className="footer border-2 border-orange-600 " style={{ backgroundColor: '#ff6b00', color: '#FFFFFF' }}>
            <Row justify="space-between" align="middle" style={{ padding: '20px 0', width: '100%' }}>
                {/* Логотип и название компании */}
                <Col xs={24} sm={12} md={8} className="text-center md:text-left">
                    <Text className="text-3xl font-bold text-zinc-50 font-custom max-[480px]:text-2xl" strong>DOĞAL</Text>
                </Col>

                {/* Социальные сети */}
                <Col xs={24} sm={12} md={8} className="footer__links text-center mt-4 sm:mt-0">
  {/* Facebook */}
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <FacebookOutlined style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
  </a>
  
  {/* X (ранее Twitter) */}
  <a href="https://x.com" target="_blank" rel="noopener noreferrer">
    <XOutlined style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
  </a>

  {/* Instagram */}
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <InstagramOutlined style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
  </a>

  {/* TikTok */}
  <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
    <TikTokOutlined style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
  </a>

  {/* Telegram */}
  <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">
    <SendOutlined style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
  </a>

  {/* LinkedIn */}
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
    <LinkedinOutlined style={{ margin: '0 10px', color: '#fff', fontSize: '24px' }} />
  </a>
</Col>


                {/* Форма подписки */}
                <Col xs={24} md={8} className="text-center md:text-right mt-4 md:mt-0">
                    <Form
                        className="footer__form"
                        layout="inline"
                        style={{ display: 'flex', justifyContent: 'center', md: { justifyContent: 'flex-end' } }}
                        onFinish={handleSubscribe}
                    >
                        <Form.Item>
                            <Input
                                className="footer__input"
                                placeholder="Введите email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '200px' }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="footer__btn"
                                type="primary"
                                loading={loading} // Индикатор загрузки
                                style={{ backgroundColor: '#026a00', borderColor: '#ff6b00' }}
                                onClick={handleSubscribe}
                            >
                                Подписаться
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Footer>
    );
};

export default MyFooter;
