import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeesAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [form] = Form.useForm();
    const [regions, setRegions] = useState([]);
    const [file, setFile] = useState(null); // Хранение выбранного файла изображения

    const kyrgyzstanRegions = [
        "Чуйская область",
        "Иссык-Кульская область",
        "Ошская область",
        "Таласская область",
        "Джалал-Абадская область",
        "Нарынская область",
        "Баткенская область",
    ];

    const countries = [
        { label: "Кыргызстан", value: "Кыргызстан" },
        { label: "Казахстан", value: "Казахстан" },
        { label: "Россия", value: "Россия" },
    ];

    const fetchEmployees = async () => {
        try {
            const { data } = await axios.get('/api/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const showModal = (employee = null) => {
        setCurrentEmployee(employee);
        form.setFieldsValue(employee || { name: '', position: '', contact: '', country: '', region: '' });
        
        setFile(null); // Сбрасываем выбранное изображение при открытии модального окна
        if (employee?.country === "Кыргызстан") {
            setRegions(kyrgyzstanRegions);
        }
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentEmployee(null);
        form.resetFields();
        setFile(null); // Сбрасываем файл при закрытии
    };

    const handleCountryChange = (value) => {
        if (value === "Кыргызстан") {
            setRegions(kyrgyzstanRegions);
        } else {
            setRegions([value]);
        }
        form.setFieldsValue({ region: "" });
    };

    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();
            
            if (file) {
                formData.append('image', file);
            }
            
            formData.append('name', values.name);
            formData.append('position', values.position);
            formData.append('contact', values.contact);
            formData.append('country', values.country);
            formData.append('region', values.region);
    
            const url = currentEmployee ? `/api/employees/${currentEmployee._id}` : '/api/employees';
            const method = currentEmployee ? 'put' : 'post';
    
            await axios({
                method,
                url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            fetchEmployees();
            handleCancel();
            message.success('Сотрудник успешно сохранен!');
        } catch (error) {
            console.error('Ошибка при сохранении сотрудника:', error);
            message.error('Ошибка при сохранении данных сотрудника!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`);
            message.success('Сотрудник удален!');
            fetchEmployees();
        } catch (error) {
            console.error('Ошибка при удалении сотрудника:', error);
            message.error('Ошибка при удалении сотрудника!');
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const columns = [
        { title: 'ФИО', dataIndex: 'name', key: 'name' },
        { title: 'Должность', dataIndex: 'position', key: 'position' },
        { title: 'Контакт', dataIndex: 'contact', key: 'contact' },
        { title: 'Страна', dataIndex: 'country', key: 'country' },
        { title: 'Область', dataIndex: 'region', key: 'region' },
        // {
        //     title: 'Фото',
        //     dataIndex: 'image',
        //     key: 'image',
        //     render: (text) => text ? <img src={text} alt="employee" style={{ width: 50, height: 'auto' }} /> : 'Нет изображения',
        // },
        {
            title: 'Действия',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => showModal(record)}><EditOutlined/></Button>
                    <Button danger onClick={() => handleDelete(record._id)}><DeleteOutlined/></Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={() => showModal()}>
                Добавить сотрудника
            </Button>
            <Table dataSource={employees} columns={columns} rowKey="_id" />
            <Modal title={currentEmployee ? 'Изменить сотрудника' : 'Добавить сотрудника'} open={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form form={form} onFinish={handleFormSubmit} initialValues={currentEmployee || {}}>
                    <Form.Item name="name" label="ФИО" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Должность" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="contact" label="Контакт" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="country" label="Страна" rules={[{ required: true }]}>
                        <Select onChange={handleCountryChange}>
                            {countries.map((country) => (
                                <Option key={country.value} value={country.value}>
                                    {country.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="region" label="Область" rules={[{ required: true }]}>
                        <Select>
                            {regions.map((region) => (
                                <Option key={region} value={region}>
                                    {region}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Фото">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeesAdmin;
