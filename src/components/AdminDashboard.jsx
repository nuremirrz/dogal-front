import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Layout, Button, Tooltip, message, Spin } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar.jsx';
import { useNavigate } from 'react-router-dom';

const { Content, Header } = Layout;

// Ленивая загрузка компонентов
const EmployeesAdmin = lazy(() => import('./EmployeesAdmin.jsx'));
const NewsAdmin = lazy(() => import('./NewsAdmin.jsx'));
const ProductsAdmin = lazy(() => import('./ProductsAdmin.jsx'));
const NewsletterAdmin = lazy(() => import('./NewsletterAdmin.jsx'));

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('employees'); // По умолчанию активен раздел сотрудников
    const navigate = useNavigate();

    // Мемоизация функции для изменения активного раздела
    const handleSectionChange = useCallback((section) => {
        setActiveSection(section);
    }, []);

    // Функция для выхода из админки
    const handleLogout = useCallback(() => {
        localStorage.removeItem('adminLoggedIn'); // Удаляем статус авторизации
        message.success('Вы вышли из админки.');
        navigate('/'); // Перенаправляем на страницу логина
    }, [navigate]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar onSectionChange={handleSectionChange} />
            <Layout>
                <Header
                    style={{
                        background: '#fff',
                        padding: '0 16px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Tooltip title="Выйти">
                        <Button
                            type="text"
                            icon={<LogoutOutlined style={{ fontSize: '24px' }} />}
                            onClick={handleLogout}
                        />
                    </Tooltip>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 20,
                        background: '#fff',
                        minHeight: 280,
                    }}
                >
                    <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: 'auto' }} />}>
                        {activeSection === 'employees' && <EmployeesAdmin />}
                        {activeSection === 'products' && <ProductsAdmin />}
                        {activeSection === 'news' && <NewsAdmin />}
                        {activeSection === 'newsletter' && <NewsletterAdmin />}
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
