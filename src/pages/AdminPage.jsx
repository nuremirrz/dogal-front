import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from "../components/AdminDashboard"

const AdminPage = () => {
    const navigate = useNavigate();
    let logoutTimer;

    // Функция для сброса таймера
    const resetTimer = useCallback(() => {
        clearTimeout(logoutTimer); // Очищаем предыдущий таймер
        logoutTimer = setTimeout(() => {
            alert('Вы вышли из админки из-за бездействия.');
            navigate('/admin/login'); // Перенаправление на страницу логина
        }, 180000); // 3 минуты
    }, [navigate]);

    // Отслеживание действий пользователя
    useEffect(() => {
        // Сбрасываем таймер при действиях
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('scroll', resetTimer);

        // Устанавливаем первый таймер
        resetTimer();

        // Очистка при выходе из компонента
        return () => {
            clearTimeout(logoutTimer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('scroll', resetTimer);
        };
    }, [resetTimer]);

    return (
        <>
            <AdminDashboard/>
        </>
    );
};

export default AdminPage;
