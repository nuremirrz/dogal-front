import React, { useState } from 'react';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu } from 'antd';
import { Link } from 'react-router-dom'; // Импортируем Link для маршрутизации
import '../styles/Navbar.css'; // Импортируем CSS стили

const items = [
    {
        key: '1',
        label: 'Кыргызстан',
        type: 'group',
        children: [
            { key: '1-1', label: <Link to="/tech-sup/kyrgyzstan/chuy">Чуйская область</Link> },
            { key: '1-2', label: <Link to="/tech-sup/kyrgyzstan/issyk-kul">Иссык-Кульская область</Link> },
            { key: '1-3', label: <Link to="/tech-sup/kyrgyzstan/osh">Ошская область</Link> },
            { key: '1-4', label: <Link to="/tech-sup/kyrgyzstan/talas">Таласская область</Link> },
            { key: '1-5', label: <Link to="/tech-sup/kyrgyzstan/jalalabad">Джалал-Абадская область</Link> },
            { key: '1-6', label: <Link to="/tech-sup/kyrgyzstan/naryn">Нарынская область</Link> },
            { key: '1-7', label: <Link to="/tech-sup/kyrgyzstan/batken">Баткенская область</Link> },
        ],
    },    
    {
        key: '2',
        type: 'group',
        label: 'Казахстан',
        children: [
            { key: '2-1', label: <Link to="/tech-sup/kazakhstan/kazakhstan">Казахстан</Link> },
        ],
    },
    {
        key: '3',
        type: 'group',
        label: 'Россия',
        children: [
            { key: '3-1', label: <Link to="/tech-sup/russia/russia">Россия</Link> },
        ],
    },    
];

// Создаем меню для выпадающего списка
const menu = <Menu items={items} />;

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar bg-green-600 border-2" style={{ borderColor: '#217c1f' }}>
            <div className="logo">
                <h1 className='ml-4 text-3xl text-bold text-white font-custom'><Link className='text-white' to="/">DOĞAL</Link></h1>
            </div>

            <div className="menu-icon" onClick={toggleMenu}>
                <MenuOutlined style={{ fontSize: '24px', color: 'white' }} />
            </div>

            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
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
