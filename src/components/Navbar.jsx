import React, { useState } from 'react';
import { DownOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Menu, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLinkClick = () => {
        if (menuOpen) setMenuOpen(false);
        setDropdownVisible(false); // Закрывает выпадающее меню
    };

    const handleDropdownVisibleChange = (flag) => {
        setDropdownVisible(flag);
    };

    const menu = (
        <Menu>
            <Menu.ItemGroup key="1" title="Кыргызстан">
                <Menu.Item key="chuy" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/chuy">Чуйская область</Link>
                </Menu.Item>
                <Menu.Item key="issyk-kul" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/issyk-kul">Иссык-Кульская область</Link>
                </Menu.Item>
                <Menu.Item key="osh" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/osh">Ошская область</Link>
                </Menu.Item>
                <Menu.Item key="talas" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/talas">Таласская область</Link>
                </Menu.Item>
                <Menu.Item key="jalalabad" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/jalalabad">Джалал-Абадская область</Link>
                </Menu.Item>
                <Menu.Item key="naryn" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/naryn">Нарынская область</Link>
                </Menu.Item>
                <Menu.Item key="batken" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kyrgyzstan/batken">Баткенская область</Link>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="2" title="Казахстан">
                <Menu.Item key="kazakhstan" onClick={handleLinkClick}>
                    <Link to="/tech-sup/kazakhstan">Казахстан</Link>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="3" title="Россия">
                <Menu.Item key="russia" onClick={handleLinkClick}>
                    <Link to="/tech-sup/russia">Россия</Link>
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup key="4" title="Узбекистан">
                <Menu.Item key="uzbekistan" onClick={handleLinkClick}>
                    <Link to="/tech-sup/uzbekistan">Узбекистан</Link>
                </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    return (
        // <nav className="navbar sticky top-0 left-0 right-0 bg-green-600 border-2" style={{ borderColor: '#217c1f' }}>
        <nav className="navbar sticky top-0 left-0 right-0 border-orange-600 border-2" style={{ backgroundColor: '#ff6b00' }}>
            <div className="logo">
                <h1 className='ml-4 text-3xl text-bold text-white font-custom'>
                    <Link className='text-white' to="/" onClick={handleLinkClick}>DOĞAL</Link>
                </h1>
            </div>

            <div className="menu-icon" onClick={toggleMenu}>
                <MenuOutlined style={{ fontSize: '24px', color: 'white' }} />
            </div>

            <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <li><Link className='no-underline' to="/" onClick={handleLinkClick}>Главное</Link></li>
                <li><Link className='no-underline' to="/products" onClick={handleLinkClick}>Продукты</Link></li>
                <li>
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        open={dropdownVisible}
                        onOpenChange={handleDropdownVisibleChange}
                        className='cursor-pointer'
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Техническая поддержка
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </li>
                <li><Link className='no-underline' to="/contact" onClick={handleLinkClick}>Контакты</Link></li>
                <li>
                    <Link className="no-underline" to="/admin/login" onClick={handleLinkClick}>
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
