import api from './api';

export const ticketLogService = {
    getAllLogs: async (filters = {}) => {
        const params = new URLSearchParams();

        if (filters.user_id) params.append('user_id', filters.user_id);
        if (filters.action) params.append('action', filters.action);
        if (filters.date_from) params.append('date_from', filters.date_from);
        if (filters.date_to) params.append('date_to', filters.date_to);
        if (filters.per_page) params.append('per_page', filters.per_page);
        if (filters.page) params.append('page', filters.page);

        const response = await api.get(`/ticket-logs?${params.toString()}`);
        return response.data;
    },

    getTicketLogs: async (ticketId) => {
        const response = await api.get(`/tickets/${ticketId}/logs`);
        return response.data;
    },
};
