import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const EmployeesAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

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
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentEmployee(null);
    };

    const handleFormSubmit = async (values) => {
        try {
            // Если есть файл, отправляем его на сервер
            if (values.image[0].originFileObj) {
                const formData = new FormData();
                formData.append('image', values.image[0].originFileObj);
                // Можно добавить дополнительные поля
                formData.append('name', values.name);
                formData.append('position', values.position);
                formData.append('contact', values.contact);
                
                const method = currentEmployee ? 'put' : 'post';
                const url = currentEmployee ? `/api/employees/${currentEmployee._id}` : '/api/employees';
                await axios[method](url, formData);
                fetchEmployees();
                handleCancel();
                message.success('Сотрудник успешно сохранен!');
            }
        } catch (error) {
            console.error('Ошибка при сохранении сотрудника:', error);
            message.error('Ошибка при сохранении данных сотрудника!');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/employees/${id}`);
            fetchEmployees();
            message.success('Сотрудник удален!');
        } catch (error) {
            console.error('Ошибка при удалении сотрудника:', error);
            message.error('Ошибка при удалении сотрудника!');
        }
    };

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Должность',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Контакт',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Фото',
            dataIndex: 'image',
            key: 'image',
            render: text => <img src={text} alt="employee" style={{ width: 50, height: 'auto' }} />
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
                Добавить сотрудника
            </Button>
            <Table dataSource={employees} columns={columns} rowKey="_id" />
            <Modal title={currentEmployee ? 'Изменить сотрудника' : 'Добавить сотрудника'} visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleFormSubmit} initialValues={currentEmployee || { name: '', position: '', contact: '', image: [] }} encType="multipart/form-data">
                    <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Должность" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="contact" label="Контакт">
                        <Input />
                    </Form.Item>
                    <Form.Item name="image" label="Фото">
                        <Upload listType="picture">
                            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                        </Upload>
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
