import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import AdminDashboard from "../components/AdminDashboard";
import { logout } from '../api/axios';

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const RESET_THROTTLE_MS = 1000;

const AdminPage = () => {
    const navigate = useNavigate();
    const logoutTimer = useRef(null);
    const lastResetAt = useRef(0);

    const resetTimer = useCallback(() => {
        const now = Date.now();
        if (now - lastResetAt.current < RESET_THROTTLE_MS) return;
        lastResetAt.current = now;

        if (logoutTimer.current) clearTimeout(logoutTimer.current);
        logoutTimer.current = setTimeout(async () => {
            await logout();
            message.info('Вы вышли из админки из-за бездействия.');
            navigate('/admin/login');
        }, IDLE_TIMEOUT_MS);
    }, [navigate]);

    useEffect(() => {
        const events = ['mousemove', 'click', 'keypress', 'scroll'];
        events.forEach((evt) => window.addEventListener(evt, resetTimer, { passive: true }));
        resetTimer();

        return () => {
            clearTimeout(logoutTimer.current);
            events.forEach((evt) => window.removeEventListener(evt, resetTimer));
        };
    }, [resetTimer]);

    return <AdminDashboard />;
};

export default AdminPage;