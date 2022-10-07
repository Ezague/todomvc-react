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
        if (error.response.status === 401) {
            return Promise.reject("Wrong credentials");
        }
        return Promise.reject(error.message);
    }
}

export const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('access_token');
    } catch (error) {
        return Promise.reject(error.message);
    }
}