import api from './api';

export const userService = {
    getUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    getUser: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    updateUser: async (id, data) => {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    },

    updatePassword: async (data) => {
        const response = await api.put('/users/profile/password', data);
        return response.data;
    },

    resetPassword: async (id) => {
        const response = await api.put(`/users/${id}/password`);
        return response.data;
    },

    searchAgents: async (keyword) => {
        const response = await api.get('/users/agents', {
            params: { keyword }
        });
        return response.data;
    },
};
