import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Spin } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Option } = Select;
const countries = [
    { label: "Кыргызстан", value: "Кыргызстан" },
    { label: "Казахстан", value: "Казахстан" },
    { label: "Россия", value: "Россия" },
    { label: "Узбекистан", value: "Узбекистан" },
]
const kyrgyzstanRegions = [
    "Чуйская область",
    "Иссык-Кульская область",
    "Ошская область",
    "Таласская область",
    "Джалал-Абадская область",
    "Нарынская область",
    "Баткенская область",
]

const EmployeesAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm(); // Создаем референс для формы



    // Загрузка данных сотрудников
    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/employees'); // Исправленный эндпоинт
            setEmployees(data);
        } catch (error) {
            console.error('Ошибка при получении данных сотрудников:', error);
            message.error('Ошибка при загрузке сотрудников');
        } finally {
            setLoading(false);
        }
    }, [])    

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // Открытие и закрытие модального окна
    const showModal = useCallback((employee = null) => {
        form.resetFields(); // Сбрасываем поля формы
        setCurrentEmployee(employee);
        setSelectedCountries(employee ? employee.countries : []);
        setImageUrl(employee ? employee.image : '');
        setIsModalVisible(true);

        if (employee) {
            // Устанавливаем значения формы для выбранного сотрудника
            form.setFieldsValue(employee);
        }
    }, [form]);

    const handleCancel = useCallback(() => {
        setIsModalVisible(false);
        setCurrentEmployee(null);
        setImageUrl('');
    }, []);

    // Создание или обновление данных сотрудника
    const handleFormSubmit = useCallback(async (values) => {
        try {
            const payload = {
                ...values,
                countries: values.countries || [],
                regions: values.regions || [],
            };
    
            const method = currentEmployee ? 'put' : 'post';
            const url = currentEmployee
                ? `/api/employees/${currentEmployee._id}` // Исправленный эндпоинт
                : `/api/employees`; // Исправленный эндпоинт
    
            await axios[method](url, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
    
            fetchEmployees();
            handleCancel();
            message.success('Сотрудник успешно сохранен!');
        } catch (error) {
            console.error('Ошибка при сохранении сотрудника:', error);
            message.error('Ошибка при сохранении данных сотрудника!');
        }
    }, [currentEmployee, fetchEmployees, handleCancel]);

    // Удаление сотрудника
    const handleDelete = useCallback(async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`); // Исправленный эндпоинт
            fetchEmployees();
            message.success('Сотрудник удален!');
        } catch (error) {
            console.error('Ошибка при удалении сотрудника:', error);
            message.error('Ошибка при удалении сотрудника!');
        }
    }, [fetchEmployees]);

    // Обработчик для обновления URL изображения
    const handleImageChange = (e) => {
        setImageUrl(e.target.value);
    };

    // Таблица для отображения сотрудников
    const columns = useMemo(() => [
        { title: 'Имя', dataIndex: 'name', key: 'name' },
        { title: 'Должность', dataIndex: 'position', key: 'position' },
        { title: 'Контакт', dataIndex: 'contact', key: 'contact' },
        {
            title: 'Фото',
            dataIndex: 'image',
            key: 'image',
            render: (text) => text ? <img src={text} alt="Фото" style={{ width: 'auto', height: 150, borderRadius: '10%' }} /> : 'Нет фото',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button className='m-0.5' onClick={() => showModal(record)}><EditOutlined /></Button>
                    <Button className='m-0.5' danger onClick={() => handleDelete(record._id)}><DeleteOutlined /></Button>
                </>
            ),
        },
    ], [showModal, handleDelete]); // зависимости
    if (loading) {
        return <Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />;
    }

    return (
        <>
            <Button type="primary" onClick={() => showModal()}>Добавить сотрудника</Button>
            <Table dataSource={employees} columns={columns} rowKey="_id" pagination={{ pageSize: 6 }} />
            <Modal
                title={currentEmployee ? 'Изменить сотрудника' : 'Добавить сотрудника'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form} // Связываем форму с референсом
                    onFinish={handleFormSubmit}
                    initialValues={currentEmployee || { name: '', position: '', contact: '', countries: [], regions: [], image: '' }}
                    layout="vertical"
                >
                    <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Должность" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="contact" label="Контакт" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="countries" label="Страны" rules={[{ required: true }]}>
                        <Select
                            mode="multiple"
                            placeholder="Выберите страну(ы)"
                            onChange={setSelectedCountries}
                        >
                            {countries.map(country => (
                                <Option key={country.value} value={country.value}>{country.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {selectedCountries.includes("Кыргызстан") && (
                        <Form.Item name="regions" label="Области (только для Кыргызстана)">
                            <Select mode="multiple" placeholder="Выберите область(и)">
                                {kyrgyzstanRegions.map(region => (
                                    <Option key={region} value={region}>{region}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                    <Form.Item name="image" label="URL фото">
                        <Input
                            placeholder="Введите ссылку на изображение"
                            onChange={handleImageChange}
                        />
                    </Form.Item>

                    {/* Предварительный просмотр изображения */}
                    {imageUrl && (
                        <div style={{ marginBottom: '20px' }}>
                            <p>Предварительный просмотр:</p>
                            <img
                                src={imageUrl}
                                alt="Предварительный просмотр"
                                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                        </div>
                    )}

                    <Button type="primary" htmlType="submit">Сохранить</Button>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeesAdmin;
