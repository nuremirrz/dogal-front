import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import '../styles/Navbar.css'; // Импортируем CSS стили

const items = [
    {
        key: '1',
        label: 'Кыргызстан',
        type: 'group',
        children: [
            {
                key: '1-1',
                label: <Link to="/tech-sup/kyrgyzstan/chuy">Чуйская область</Link>, // Переход на Чуйскую область
            },
            {
                key: '1-2',
                label: <Link to="/tech-sup/kyrgyzstan/issyk-kul">Иссык-Кульская область</Link>, // Переход на Иссык-Кульскую область
            },
            {
                key: '1-3',
                label: <Link to="/tech-sup/kyrgyzstan/osh">Ошская область</Link>, // Переход на Ошскую область
            },
            {
                key: '1-4',
                label: <Link to="/tech-sup/kyrgyzstan/talas">Таласская область</Link>, // Переход на Таласскую область
            },
            {
                key: '1-5',
                label: <Link to="/tech-sup/kyrgyzstan/jalalabad">Джалал-Абадская область</Link>, // Переход на Джалал-Абадскую область
            },
            {
                key: '1-6',
                label: <Link to="/tech-sup/kyrgyzstan/naryn">Нарынская область</Link>, // Переход на Нарынскую область
            },
           
            {
                key: '1-7',
                label: <Link to="/tech-sup/kyrgyzstan/batken">Баткенская область</Link>, // Переход на Баткенскую область
            },
        ],
    },
    {
        key: '2',
        label: <Link to="/tech-sup/kazakhstan">Казахстан</Link>,       
    },
    {
        key: '3',
        label: <Link to="/tech-sup/russia">Россия</Link>,        
    },
];

// Создаем меню для выпадающего списка
const menu = (
    <Menu items={items} />
);

const Navbar = () => {
    return (
        <nav className="navbar bg-green-600 border-2" style={{ borderColor: '#217c1f' }}>
            <div className="logo">
                <h1 className='ml-4 text-3xl text-bold text-white font-custom'>DOĞAL</h1>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Главное</Link></li>
                <li><Link to="/products">Продукты</Link></li>
                <li>
                    <Dropdown overlay={menu} className='cursor-pointer' trigger={['click']}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Техническая поддержка
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </li>
                <li><Link to="/contact">Контакты</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
