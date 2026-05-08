import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

if (!baseURL && import.meta.env.PROD) {
    console.warn('[api] VITE_API_URL не задан — все запросы будут относительными');
}

const api = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

let csrfToken = null;
let csrfPromise = null;

export const fetchCsrfToken = async () => {
    if (csrfPromise) return csrfPromise;
    csrfPromise = api
        .get('/api/admin/csrf-token')
        .then(({ data }) => {
            csrfToken = data?.csrfToken || null;
            return csrfToken;
        })
        .finally(() => {
            csrfPromise = null;
        });
    return csrfPromise;
};

const clearCsrfToken = () => {
    csrfToken = null;
};

const MUTATING_METHODS = new Set(['post', 'put', 'patch', 'delete']);
const CSRF_EXEMPT_PATHS = [
    '/api/admin/login',
    '/api/admin/logout',
    '/api/admin/csrf-token',
    '/api/subscribers/subscribe',
    '/api/subscribers/unsubscribe',
];

const isCsrfExempt = (url = '') => CSRF_EXEMPT_PATHS.some((path) => url.includes(path));

api.interceptors.request.use(async (config) => {
    const method = (config.method || 'get').toLowerCase();
    if (MUTATING_METHODS.has(method) && !isCsrfExempt(config.url || '')) {
        if (!csrfToken) {
            try {
                await fetchCsrfToken();
            } catch {
                // Если не удалось получить — пусть бэк вернёт 403, дальше interceptor разберётся.
            }
        }
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error?.response?.status;
        const originalRequest = error?.config;

        // CSRF-токен протух/невалиден → один раз пробуем перевыпустить и повторить.
        if (
            status === 403 &&
            originalRequest &&
            !originalRequest.__csrfRetried &&
            !isCsrfExempt(originalRequest.url || '')
        ) {
            originalRequest.__csrfRetried = true;
            clearCsrfToken();
            try {
                await fetchCsrfToken();
                if (csrfToken) {
                    originalRequest.headers['X-CSRF-Token'] = csrfToken;
                    return api(originalRequest);
                }
            } catch {
                // упадём в общий обработчик
            }
        }

        if (status === 401) {
            clearCsrfToken();
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
    clearCsrfToken();
    await fetchCsrfToken();
    return data;
};

export const logout = async () => {
    try {
        await api.post('/api/admin/logout');
    } catch {
        // даже если запрос упал, локально считаем выход состоявшимся
    }
    clearCsrfToken();
};

export const fetchCurrentUser = async () => {
    const { data } = await api.get('/api/admin/me');
    return data;
};

export default api;