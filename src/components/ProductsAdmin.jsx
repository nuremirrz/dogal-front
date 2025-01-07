import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, InputNumber, Select, message, Spin } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const categories = [
    "Гербициды", "ПГР", "Специальные Препараты", "Инсектициды", "Удобрения", "Акарициды", "Нематициды",
    "Фунгициды", "Моллюскоциды", "Фумиганты"
];

const ProductsAdmin = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    // Загрузка данных продуктов
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/products');
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Ошибка при получении данных продуктов:', error);
            message.error('Ошибка при загрузке продуктов');
        } finally {
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Фильтрация продуктов на основе поиска
    useEffect(() => {
        if (!searchTerm) {
            setFilteredProducts(products);
        } else {
            const lowercasedSearchTerm = searchTerm.toLowerCase();
            setFilteredProducts(products.filter(product =>
                product.name.toLowerCase().includes(lowercasedSearchTerm) ||
                product.category.toLowerCase().includes(lowercasedSearchTerm) ||
                product.description.toLowerCase().includes(lowercasedSearchTerm)
            ));
        }
    }, [searchTerm, products]);

    // Открытие и закрытие модального окна
    const showModal = useCallback((product = null) => {
        form.resetFields();
        setCurrentProduct(product);
        if (product) form.setFieldsValue(product);
        setIsModalVisible(true);
    },[form]);

    const handleCancel = useCallback(() => {
        setIsModalVisible(false);
        setCurrentProduct(null);
    },[]);

    // Создание или обновление продукта
    const handleFormSubmit = useCallback(async (values) => {
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
    },[currentProduct, fetchProducts, handleCancel]);

    // Удаление продукта
    const handleDelete = useCallback(async (id) => {
        try {
            await axios.delete(`/api/products/${id}`);
            fetchProducts();
            message.success('Продукт удален!');
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
            message.error('Ошибка при удалении продукта!');
        }
    },[fetchProducts]);

    // Таблица для отображения продуктов
    const columns = useMemo(() => [
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
            title: 'Активные ингредиенты',
            dataIndex: 'activeIngredients',
            key: 'activeIngredients',            
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
    ],[showModal, handleDelete]);
    
    if (loading) {
      	return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
   	}

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <Input
                    placeholder="Поиск по названию, категории или описанию"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px' }}
                />
                <Button type="primary" onClick={() => showModal()}>
                    Добавить продукт
                </Button>
            </div>
            <Table dataSource={filteredProducts} columns={columns} rowKey="_id" pagination={{ pageSize: 6 }} />
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
