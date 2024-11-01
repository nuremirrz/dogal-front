import React from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, ShoppingOutlined, NotificationOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const  Sidebar = ({ onSectionChange }) => { // Принимаем функцию onSectionChange как пропс
    const items = [
        {label: 'Сотрудники', key: 'employees', icon: <UserOutlined />},
        {label: 'Продукция', key: 'products', icon: <ShoppingOutlined />},
        {label: 'Новости', key: 'news', icon: <NotificationOutlined />},
    ]
    return (
        <Sider collapsible>
            <div className="logo" />
            <Menu theme="dark" 
                defaultSelectedKeys={['1']} 
                mode="inline" 
                onSelect={({ key }) => onSectionChange(key)} 
                items={items}
            />           
        </Sider>
    );
};

export default Sidebar;
