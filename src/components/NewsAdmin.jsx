import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message } from 'antd';

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
            title: 'Содержание',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => showModal(record)}>Изменить</Button>
                    <Button danger onClick={() => handleDelete(record._id)}>Удалить</Button>
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
                <Form onFinish={handleFormSubmit} initialValues={currentNews || { title: '', content: '' }}>
                    <Form.Item name="title" label="Заголовок" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Содержание" rules={[{ required: true }]}>
                        <Input.TextArea rows={4} />
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
