import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const categories = [
    "Гербициды", "ПГР", "Инсектициды", "Акарициды", "Нематициды",
    "Фунгициды", "Моллюскоциды", "Фумиганты"
];

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [form] = Form.useForm();

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
        form.resetFields();
        setCurrentProduct(product);
        if (product) form.setFieldsValue(product);
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
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
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
            render: (text) => `${text} сом`,
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
            <Table dataSource={products} columns={columns} rowKey="_id" pagination={{ pageSize: 6 }} />
            <Modal
                title={currentProduct ? 'Изменить продукт' : 'Добавить продукт'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleFormSubmit}
                    initialValues={{
                        name: '',
                        description: '',
                        price: 0,
                        category: '',
                        aplicableCrops: [],
                        activeIngredients: [],
                        image: ''
                    }}
                    layout="vertical"
                >
                    <Form.Item name="name" label="Название" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Категория" rules={[{ required: true }]}>
                        <Select placeholder="Выберите категорию">
                            {categories.map(category => (
                                <Option key={category} value={category}>{category}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Описание" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="price" label="Цена" rules={[{ required: true }]}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>                    
                    <Form.Item name="aplicableCrops" label="Применимые культуры">
                        <Select mode="tags" placeholder="Введите культуры">
                        </Select>
                    </Form.Item>
                    <Form.Item name="activeIngredients" label="Активные ингредиенты">
                        <Select mode="tags" placeholder="Введите ингредиенты">
                        </Select>
                    </Form.Item>                    
                    <Form.Item name="image" label="Ссылка на изображение">
                        <Input placeholder="Введите URL изображения" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
                        Сохранить
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default ProductsAdmin;
