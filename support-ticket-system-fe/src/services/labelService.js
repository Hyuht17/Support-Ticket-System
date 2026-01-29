import api from './api';

export const labelService = {
    getLabels: async () => {
        const response = await api.get('/labels');
        return response.data;
    },

    createLabel: async (data) => {
        const response = await api.post('/labels', data);
        return response.data;
    },

    updateLabel: async (id, data) => {
        const response = await api.patch(`/labels/${id}`, data);
        return response.data;
    },

    deleteLabel: async (id) => {
        const response = await api.delete(`/labels/${id}`);
        return response.data;
    },
};
