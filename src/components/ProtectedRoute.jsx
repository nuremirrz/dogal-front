import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('adminLoggedIn'); // Проверяем статус авторизации

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />; // Перенаправление на страницу логина
    }

    return children; // Рендерим дочерние компоненты, если авторизован
};

export default ProtectedRoute;
