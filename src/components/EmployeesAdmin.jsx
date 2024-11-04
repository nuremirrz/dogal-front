import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const countries = [
    { label: "Кыргызстан", value: "Кыргызстан" },
    { label: "Казахстан", value: "Казахстан" },
    { label: "Россия", value: "Россия" },
];

const kyrgyzstanRegions = [
    "Чуйская область",
    "Иссык-Кульская область",
    "Ошская область",
    "Таласская область",
    "Джалал-Абадская область",
    "Нарынская область",
    "Баткенская область",
];

const EmployeesAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [fileList, setFileList] = useState([]);

    // Загрузка данных сотрудников
    const fetchEmployees = async () => {
        try {
            const { data } = await axios.get('/api/employees');
            setEmployees(data);
        } catch (error) {
            console.error('Ошибка при получении данных сотрудников:', error);
            message.error('Ошибка при загрузке сотрудников');
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Открытие и закрытие модального окна
    const showModal = (employee = null) => {
        setCurrentEmployee(employee);
        setSelectedCountries(employee ? employee.countries : []);
        setFileList(employee && employee.image ? [{
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: employee.image,
        }] : []);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentEmployee(null);
        setFileList([]);
    };

    // Создание или обновление данных сотрудника
    const handleFormSubmit = async (values) => {
        try {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'countries' || key === 'regions') {
                    formData.append(key, JSON.stringify(values[key]));
                } else {
                    formData.append(key, values[key]);
                }
            });
            if (fileList.length > 0) {
                formData.append("image", fileList[0].originFileObj);
            }

            const method = currentEmployee ? 'put' : 'post';
            const url = currentEmployee ? `/api/employees/${currentEmployee._id}` : '/api/employees';
            await axios[method](url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            fetchEmployees();
            handleCancel();
            message.success('Сотрудник успешно сохранен!');
        } catch (error) {
            console.error('Ошибка при сохранении сотрудника:', error);
            message.error('Ошибка при сохранении данных сотрудника!');
        }
    };

    // Удаление сотрудника
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

    // Обработчик изменения файла
    const handleFileChange = ({ fileList }) => setFileList(fileList);

    // Таблица для отображения сотрудников
    const columns = [
        { title: 'Имя', dataIndex: 'name', key: 'name' },
        { title: 'Должность', dataIndex: 'position', key: 'position' },
        { title: 'Контакт', dataIndex: 'contact', key: 'contact' },
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
            <Button type="primary" onClick={() => showModal()}>Добавить сотрудника</Button>
            <Table dataSource={employees} columns={columns} rowKey="_id" />
            <Modal
                title={currentEmployee ? 'Изменить сотрудника' : 'Добавить сотрудника'}
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    onFinish={handleFormSubmit}
                    initialValues={currentEmployee || { name: '', position: '', contact: '', countries: [], regions: [] }}
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
                    <Form.Item label="Фото" valuePropName="fileList">
                        <Upload
                            fileList={fileList}
                            onChange={handleFileChange}
                            beforeUpload={() => false} // Предотвращение авто-загрузки
                            listType="picture"
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Загрузить фото</Button>
                        </Upload>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Сохранить</Button>
                </Form>
            </Modal>
        </>
    );
};

export default EmployeesAdmin;
