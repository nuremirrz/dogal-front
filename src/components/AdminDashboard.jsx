import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar.jsx';
import EmployeesAdmin from './EmployeesAdmin.jsx';
import NewsAdmin from './NewsAdmin.jsx';
import ProductsAdmin from './ProductsAdmin.jsx';

const { Content } = Layout;

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('employees'); // По умолчанию активен раздел сотрудников

    // Функция для изменения активного раздела, вызывается из Sidebar
    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar onSectionChange={handleSectionChange} />
            <Layout>
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
