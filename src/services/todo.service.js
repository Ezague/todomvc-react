import { api } from './';

export const getTodos = async () => {
    try {
        const response = await api.get('/todos');
        return response.data.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const addTodo = async (title) => {
    try {
        const response = await api.post('/todos', {
            title,
        });
        return response.data.data;
    } catch (error) {
        Promise.reject(error.data.message);
    }
}

export const updateTodo = async (id, values) => {
    try {
        const response = await api.patch(`/todos/${id}`, values);
        return response.data.data;
    } catch (error) {
        Promise.reject(error.data.message);
    }
}

export const deleteTodo = async (id) => {
    try {
        const response = await api.delete(`/todos/${id}`);
        return response.data.data;
    } catch (error) {
        Promise.reject(error.data.message);
    }
}