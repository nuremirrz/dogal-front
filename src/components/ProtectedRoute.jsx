import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { fetchCurrentUser } from '../api/axios';

const ProtectedRoute = ({ children }) => {
    const [status, setStatus] = useState('checking'); // 'checking' | 'authed' | 'guest'

    useEffect(() => {
        let active = true;
        fetchCurrentUser()
            .then(() => {
                if (active) setStatus('authed');
            })
            .catch(() => {
                if (active) setStatus('guest');
            });
        return () => {
            active = false;
        };
    }, []);

    if (status === 'checking') {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    if (status === 'guest') {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;