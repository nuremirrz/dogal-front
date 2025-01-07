import React, { memo, useMemo } from 'react';
import { Menu, Layout } from 'antd';
import { UserOutlined, ShoppingOutlined, NotificationOutlined, MailOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = memo(
    ({ onSectionChange }) => {
        // Мемоизация массива `items`
        const items = useMemo(
            () => [
                { label: 'Сотрудники', key: 'employees', icon: <UserOutlined /> },
                { label: 'Продукция', key: 'products', icon: <ShoppingOutlined /> },
                { label: 'Новости', key: 'news', icon: <NotificationOutlined /> },
                { label: 'Рассылки', key: 'newsletter', icon: <MailOutlined /> },
            ],
            [] // Зависимости отсутствуют, т.к. значения статичны
        );

        return (
            <Sider collapsible>
                <div className="logo" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    onSelect={({ key }) => onSectionChange(key)}
                    items={items}
                />
            </Sider>
        );
    },
    (prevProps, nextProps) => prevProps.onSectionChange === nextProps.onSectionChange
);

export default Sidebar;
