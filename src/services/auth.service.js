import { api } from './';

export const login = async (username, password) => {
    try {
        const response = await api.post('/login', {
            username,
            password,
        });
        const access_token = response.data.access_token;
        localStorage.setItem('access_token', access_token);
    } catch (error) {
        Promise.reject(error.data.message);
    }
}

export const logout = () => {
    return api.post('/logout');
}