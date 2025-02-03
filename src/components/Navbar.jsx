import React, { useState } from 'react';
import { DownOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Kg from '../assets/images/kg.svg'
import Kz from '../assets/images/kz.svg'
import Uz from '../assets/images/uz.svg'
import Ru from '../assets/images/ru.svg'
import '../styles/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleDropdownVisibleChange = (flag) => {
        setDropdownVisible(flag);
    };

    const countriesData = [
        { key: 'kg', name: 'Кыргызстан', image: Kg, path: '/structure/kyrgyzstan' },
        { key: 'kz', name: 'Казахстан', image: Kz, path: '/structure/kazakhstan' },
        { key: 'uz', name: 'Узбекистан', image: Uz, path: '/structure/uzbekistan' },
        { key: 'ru', name: 'Россия', image: Ru, path: '/structure/russia' },
      ];

    const countriesMenuItems = countriesData.map((country) => ({
        key: country.key,
        label: (
          <>
            <img src={country.image} alt={country.name} style={{ width: '15px', marginRight: '8px' }} />
            {country.name}
          </>
        ),
        path: country.path,
    }));

    const menu = (
        <Menu>
            <Menu.ItemGroup key="1" title="Кыргызстан">
                {[  
                    { key: 'chuy', name: 'Чуйская область' },
                    { key: 'issyk-kul', name: 'Иссык-Кульская область' },
                    { key: 'osh', name: 'Ошская область' },
                    { key: 'talas', name: 'Таласская область' },
                    { key: 'jalalabad', name: 'Джалал-Абадская область' },
                    { key: 'naryn', name: 'Нарынская область' },
                    { key: 'batken', name: 'Баткенская область' },
                ].map((region) => (
                    <Menu.Item key={region.key}>
                        <Link to={`/tech-sup/kyrgyzstan/${region.key}`}>
                            {region.name}
                        </Link>
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
            <Menu.ItemGroup key="2" title="Казахстан">
                <Menu.Item key="kazakhstan">
                    <Link to="/tech-sup/kazakhstan">Казахстан</Link>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="3" title="Россия">
                <Menu.Item key="russia">
                    <Link to="/tech-sup/russia">Россия</Link>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="4" title="Узбекистан">
                <Menu.Item key="uzbekistan">
                    <Link to="/tech-sup/uzbekistan">Узбекистан</Link>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    return (
        <nav className="navbar sticky top-0 left-0 right-0 border-orange-600 border-2" style={{ backgroundColor: '#ff6b00' }}>
            <div className="logo">
                <h1 className='ml-4 text-3xl text-bold text-white font-custom'>
                    <Link className='text-white' to="/">DOĞAL</Link>
                </h1>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
                <MenuOutlined style={{ fontSize: '24px', color: 'white' }} />
            </div>
            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <li><Link className='no-underline' to="/">Главное</Link></li>
                <li><Link className='no-underline' to="/products">Продукты</Link></li>
                <li>
                    <Dropdown overlay={menu} trigger={['click']} open={dropdownVisible} onOpenChange={handleDropdownVisibleChange} className="cursor-pointer">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Техническая поддержка
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown
                        menu={{
                            items: countriesMenuItems.map((item) => ({
                                key: item.key,
                                label: (
                                    <div onClick={() => window.location.href = item.path}>
                                        {item.label}
                                    </div>
                                ),
                            })),
                        }}
                        trigger={['click']}
                        className="cursor-pointer"
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Наша команда
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </li>
                <li><Link className='no-underline' to="/contact">Контакты</Link></li>
                <li>
                    <Link className="no-underline" to="/admin/login">
                        <Tooltip title="Admin Panel">
                            <UserOutlined style={{ fontSize: '24px' }} />
                        </Tooltip>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
