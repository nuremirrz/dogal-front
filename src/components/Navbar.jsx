import React from 'react';
import '../styles/Navbar.css'; // Импортируем CSS стили

const Navbar = () => {
    return (
        <nav className="navbar bg-green-600 border-2" style={{borderColor: '#217c1f'}}>
            <div className="logo">
              <h1 className=' ml-4 text-3xl text-bold text-whıte font-custom'>DOĞAL</h1>
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
