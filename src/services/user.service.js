import { api } from './';

export const createUser = async (username, password) => {
    try {
        const response = await api.post('/users', {
            username,
            password,
        });
        return response.data.data;
    } catch (error) {
        if (error.response.status === 401) {
            return Promise.reject("Wrong credentials");
        }
        return Promise.reject(error.message);
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data.data;
    } catch (error) {
        Promise.reject(error.data.message);
    }
}