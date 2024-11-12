import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Checkbox, DatePicker, InputNumber, message } from 'antd';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);

    // Загрузка данных новостей
    const fetchNews = async () => {
        try {
            const { data } = await axios.get('/api/news');
            setNews(data);
        } catch (error) {
            console.error('Ошибка при получении данных новостей:', error);
            message.error('Ошибка при загрузке новостей');
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    // Открытие и закрытие модального окна
    const showModal = (newsItem = null) => {
        setCurrentNews(newsItem);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentNews(null);
    };

    // Создание или обновление новости
    const handleFormSubmit = async (values) => {
        try {
            const method = currentNews ? 'put' : 'post';
            const url = currentNews ? `/api/news/${currentNews._id}` : '/api/news';
            await axios[method](url, values);
            fetchNews();
            handleCancel();
            message.success('Новость успешно сохранена!');
        } catch (error) {
            console.error('Ошибка при сохранении новости:', error);
            message.error('Ошибка при сохранении данных новости!');
        }
    };

    // Удаление новости
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/news/${id}`);
            fetchNews();
            message.success('Новость удалена!');
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
            message.error('Ошибка при удалении новости!');
        }
    };

    // Таблица для отображения новостей
    const columns = [
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Опубликовано',
            dataIndex: 'published',
            key: 'published',
            render: (published) => (published ? 'Да' : 'Нет'),
        },
        {
            title: 'Просмотры',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: 'Лайки',
            dataIndex: 'likes',
            key: 'likes',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button className='m-0.5' onClick={() => showModal(record)}><EditOutlined/></Button>
                    <Button className='m-0.5' danger onClick={() => handleDelete(record._id)}><DeleteOutlined/></Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => showModal()}>
                Добавить новость
            </Button>
            <Table dataSource={news} columns={columns} rowKey="_id" />
            <Modal title={currentNews ? 'Изменить новость' : 'Добавить новость'} open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleFormSubmit} initialValues={{
                    ...currentNews,
                    publishedAt: currentNews?.publishedAt ? moment(currentNews.publishedAt) : null
                }}>
                    <Form.Item name="title" label="Заголовок" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Содержание" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item name="image" label="Ссылка на изображение" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Категория" rules={[{ required: true }]}>
                        <Select>
                            <Option value="События">События</Option>
                            <Option value="Объявления">Объявления</Option>
                            <Option value="Новости компании">Новости компании</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="tags" label="Теги">
                        <Input placeholder="Введите теги через запятую" />
                    </Form.Item>
                    <Form.Item name="published" label="Опубликовано" valuePropName="checked">
                        <Checkbox>Опубликовать новость</Checkbox>
                    </Form.Item>
                    <Form.Item name="publishedAt" label="Дата публикации">
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name="views" label="Просмотры">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item name="likes" label="Лайки">
                        <InputNumber min={0} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default NewsAdmin;
