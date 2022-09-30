import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

api.interceptors.request.use((config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
});