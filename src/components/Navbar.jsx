import React from 'react';
import '../styles/Navbar.css'; // Импортируем CSS стили
import logo from '../assets/logo.png'
const Navbar = () => {
    return (
        <nav className="navbar bg-green-600">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <ul className="nav-links">
                <li><a href="/">Главное</a></li>
                <li><a href="/products">Продукты</a></li>
                <li><a href="/tech-sup">Техническая поддержка</a></li>
                <li><a href="/contact">Контакты</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
