import api from './api';

export const ticketService = {
  getTickets: async (params = {}) => {
    const response = await api.get('/tickets', { params });
    return response.data;
  },

  getTicket: async (id) => {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  },

  createTicket: async (data) => {
    const response = await api.post('/tickets', data);
    return response.data;
  },

  updateTicket: async (id, data) => {
    const response = await api.patch(`/tickets/${id}`, data);
    return response.data;
  },

  updateTicketWithFiles: async (id, formData) => {
    const response = await api.post(`/tickets/${id}`, formData);
    return response.data;
  },

  deleteTicket: async (id) => {
    const response = await api.delete(`/tickets/${id}`);
    return response.data;
  },

  getTicketLogs: async (id) => {
    const response = await api.get(`/tickets/${id}/logs`);
    return response.data;
  },

  getTicketStats: async () => {
    const response = await api.get('/tickets/stats');
    return response.data;
  },
};
