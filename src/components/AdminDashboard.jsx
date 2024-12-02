import React, { useState } from 'react';
import { Layout, Button, Tooltip, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar.jsx';
import EmployeesAdmin from './EmployeesAdmin.jsx';
import NewsAdmin from './NewsAdmin.jsx';
import ProductsAdmin from './ProductsAdmin.jsx';
import { useNavigate } from 'react-router-dom';

const { Content, Header } = Layout;

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('employees'); // По умолчанию активен раздел сотрудников
    const navigate = useNavigate();

    // Функция для изменения активного раздела, вызывается из Sidebar
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    // Функция для выхода из админки
    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn'); // Удаляем статус авторизации
        message.success('Вы вышли из админки.');
        navigate('/'); // Перенаправляем на страницу логина
        
    };
    
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar onSectionChange={handleSectionChange} />
            <Layout>
                <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Tooltip title="Выйти">
                        <Button
                            type="text"
                            icon={<LogoutOutlined style={{ fontSize: '24px'  }} />}
                            onClick={handleLogout}
                        />
                    </Tooltip>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 20, background: '#fff', minHeight: 280 }}>
                    {activeSection === 'employees' && <EmployeesAdmin />}
                    {activeSection === 'products' && <ProductsAdmin />}
                    {activeSection === 'news' && <NewsAdmin />}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
