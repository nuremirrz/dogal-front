import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Загрузка данных продуктов
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        } catch (error) {
            console.error('Ошибка при получении данных продуктов:', error);
            message.error('Ошибка при загрузке продуктов');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Открытие и закрытие модального окна
    const showModal = (product = null) => {
        setCurrentProduct(product);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentProduct(null);
    };

    // Создание или обновление продукта
    const handleFormSubmit = async (values) => {
        try {
            const method = currentProduct ? 'put' : 'post';
            const url = currentProduct ? `/api/products/${currentProduct._id}` : '/api/products';
            await axios[method](url, values);
            fetchProducts();
            handleCancel();
            message.success('Продукт успешно сохранен!');
        } catch (error) {
            console.error('Ошибка при сохранении продукта:', error);
            message.error('Ошибка при сохранении данных продукта!');
        }
    };

    // Удаление продукта
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts();
            message.success('Продукт удален!');
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            message.error('Ошибка при удалении продукта!');
        }
    };

    // Таблица для отображения продуктов
    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text.toFixed(2)}`, // Форматирование цены
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
                Добавить продукт
            </Button>
            <Table dataSource={products} columns={columns} rowKey="_id" pagination={{pageSize: 6}} />
            <Modal title={currentProduct ? 'Изменить продукт' : 'Добавить продукт'} open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleFormSubmit} initialValues={currentProduct || { name: '', description: '', price: 0 }}>
                    <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                        <InputNumber min={0} step={0.01} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default ProductsAdmin;
