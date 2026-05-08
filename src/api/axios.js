import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

if (!baseURL && import.meta.env.PROD) {
    console.warn('[api] VITE_API_URL не задан — все запросы будут относительными');
}

const TOKEN_STORAGE_KEY = 'auth_token';

const getStoredToken = () => {
    try {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
        return null;
    }
};

const setStoredToken = (token) => {
    try {
        if (token) {
            localStorage.setItem(TOKEN_STORAGE_KEY, token);
        } else {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    } catch {
        // localStorage может быть недоступен (приватный режим, квота) — игнорируем
    }
};

const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) {
            setStoredToken(null);
            if (
                window.location.pathname.startsWith('/admin') &&
                window.location.pathname !== '/admin/login'
            ) {
                window.location.replace('/admin/login');
            }
        }
        return Promise.reject(error);
    }
);

export const login = async (credentials) => {
    const { data } = await api.post('/api/admin/login', credentials);
    if (data?.token) {
        setStoredToken(data.token);
    }
    return data;
};

export const logout = async () => {
    try {
        await api.post('/api/admin/logout');
    } catch {
        // даже если запрос упал, локально считаем выход состоявшимся
    }
    setStoredToken(null);
};

export const fetchCurrentUser = async () => {
    const { data } = await api.get('/api/admin/me');
    return data;
};

export default api;