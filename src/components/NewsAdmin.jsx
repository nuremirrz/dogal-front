import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, Checkbox, DatePicker, InputNumber, message, Spin } from 'antd';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Загрузка данных новостей
    const fetchNews = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news?showAll=true`); // Добавляем параметр
            setNews(data);
        } catch (error) {
            console.error('Ошибка при получении данных новостей:', error);
            message.error('Ошибка при загрузке новостей');
        } finally {
            setLoading(false);
        }
    }, []);    

    useEffect(() => {
        fetchNews();
    }, [fetchNews]);

    // Открытие модального окна
    const showModal = useCallback((newsItem = null) => {
        form.resetFields();
        setCurrentNews(newsItem);
        if (newsItem) form.setFieldsValue({ ...newsItem, publishedAt: newsItem.publishedAt ? moment(newsItem.publishedAt) : null });
        setIsModalVisible(true);
    }, [form]);

    const handleCancel = useCallback(() => {
        setIsModalVisible(false);
        setCurrentNews(null);
    }, []);

    // Создание или обновление новости
    const handleFormSubmit = useCallback(async (values) => {
        try {
            const method = currentNews ? 'put' : 'post';
            const url = currentNews 
            ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news/${currentNews._id}` 
            : `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news`;
        
            const { data } = await axios[method](url, values);

            setNews((prevNews) =>
                currentNews
                    ? prevNews.map((item) => (item._id === data._id ? data : item))
                    : [...prevNews, data]
            );

            handleCancel();
            message.success('Новость успешно сохранена!');
        } catch (error) {
            console.error('Ошибка при сохранении новости:', error);
            message.error('Ошибка при сохранении данных новости!');
        }
    }, [currentNews, handleCancel]);

    // Удаление новости
    const handleDelete = useCallback(async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/news/${id}`);
            setNews((prevNews) => prevNews.filter((item) => item._id !== id));
            message.success('Новость удалена!');
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
            message.error('Ошибка при удалении новости!');
        }
    }, []);

    // Мемоизация колонок таблицы
    const columns = useMemo(
        () => [
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
                title: 'Дата публикации',
                dataIndex: 'publishedAt',
                key: 'publishedAt',
                render: (publishedAt) =>
                    publishedAt ? moment(publishedAt).format('DD.MM.YYYY HH:mm') : 'Не опубликовано',
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
                        <Button className="m-0.5" onClick={() => showModal(record)}>
                            <EditOutlined />
                        </Button>
                        <Button className="m-0.5" danger onClick={() => handleDelete(record._id)}>
                            <DeleteOutlined />
                        </Button>
                    </>
                ),
            },
        ],
        [showModal, handleDelete]
    );

    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
    }

    return (
        <>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
                Добавить новость
            </Button>
            <Table dataSource={news} columns={columns} rowKey="_id" pagination={{ pageSize: 6 }} />
            <Modal
                title={currentNews ? 'Изменить новость' : 'Добавить новость'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleFormSubmit} layout="vertical">
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
