import React from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, ShoppingOutlined, NotificationOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ onSectionChange }) => { // Принимаем функцию onSectionChange как пропс
    return (
        <Sider collapsible>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onSelect={({ key }) => onSectionChange(key)}>
                <Menu.Item key="employees" icon={<UserOutlined />}>
                    Сотрудники
                </Menu.Item>
                <Menu.Item key="products" icon={<ShoppingOutlined />}>
                    Продукция
                </Menu.Item>
                <Menu.Item key="news" icon={<NotificationOutlined />}>
                    Новости
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
