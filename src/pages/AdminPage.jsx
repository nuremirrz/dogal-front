import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from "../components/AdminDashboard";

const AdminPage = () => {
    const navigate = useNavigate();
    const logoutTimer = useRef(null); // Используем useRef

    const resetTimer = useCallback(() => {
        if (logoutTimer.current) {
            clearTimeout(logoutTimer.current); // Очищаем предыдущий таймер
        }
        logoutTimer.current = setTimeout(() => {
            alert('Вы вышли из админки из-за бездействия.');
            navigate('/admin/login'); // Перенаправление на страницу логина
        }, 180000); // 3 минуты
    }, [navigate]);
// алту
    useEffect(() => {
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);

        resetTimer(); // Устанавливаем первый таймер

        return () => {
            clearTimeout(logoutTimer.current);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('scroll', resetTimer);
        };
    }, [resetTimer]);

    return <AdminDashboard />;
};

export default AdminPage;
