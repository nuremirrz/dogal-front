import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Проверяем токен в localStorage

    if (!token) {
        return <Navigate to="/admin/login" replace />; // Перенаправляем на страницу логина
    }

    return children; // Если токен есть, рендерим дочерние элементы
};

export default ProtectedRoute;
