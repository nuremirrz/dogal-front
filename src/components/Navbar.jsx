import React, { useState, useMemo } from 'react';
import { DownOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import Kg from '../assets/images/kg.svg'
import Kz from '../assets/images/kz.svg'
import Uz from '../assets/images/uz.svg'
import Ru from '../assets/images/ru.svg'
import { kyrgyzstanRegions } from '../data/regionNames';
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

    const techSupportItems = useMemo(() => ([
        {
            key: '1',
            type: 'group',
            label: 'Кыргызстан',
            children: kyrgyzstanRegions.map((region) => ({
                key: region.slug,
                label: <Link to={`/tech-sup/kyrgyzstan/${region.slug}`}>{region.name}</Link>,
            })),
        },
        {
            key: '2',
            type: 'group',
            label: 'Казахстан',
            children: [{ key: 'kazakhstan', label: <Link to="/tech-sup/kazakhstan">Казахстан</Link> }],
        },
        {
            key: '3',
            type: 'group',
            label: 'Россия',
            children: [{ key: 'russia', label: <Link to="/tech-sup/russia">Россия</Link> }],
        },
        {
            key: '4',
            type: 'group',
            label: 'Узбекистан',
            children: [{ key: 'uzbekistan', label: <Link to="/tech-sup/uzbekistan">Узбекистан</Link> }],
        },
    ]), []);

    const teamItems = useMemo(() => ([
        { key: 'kg', flag: Kg, name: 'Кыргызстан', path: '/structure/kyrgyzstan' },
        { key: 'kz', flag: Kz, name: 'Казахстан', path: '/structure/kazakhstan' },
        { key: 'uz', flag: Uz, name: 'Узбекистан', path: '/structure/uzbekistan' },
        { key: 'ru', flag: Ru, name: 'Россия', path: '/structure/russia' },
    ].map((country) => ({
        key: country.key,
        label: (
            <Link to={country.path} className="flex items-center no-underline" style={{ color: 'inherit' }}>
                <img src={country.flag} alt={country.name} style={{ width: '15px', marginRight: '8px' }} />
                {country.name}
            </Link>
        ),
    }))), []);

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
                    <Dropdown
                        menu={{ items: techSupportItems }}
                        trigger={['click']}
                        open={dropdownVisible}
                        onOpenChange={handleDropdownVisibleChange}
                        className="cursor-pointer"
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Техническая поддержка
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown menu={{ items: teamItems }} trigger={['click']} className="cursor-pointer">
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