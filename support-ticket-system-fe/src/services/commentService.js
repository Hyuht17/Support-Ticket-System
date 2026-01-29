import api from './api';

export const commentService = {
  getComments: async (ticketId) => {
    const response = await api.get(`/tickets/${ticketId}/comments`);
    return response.data;
  },

  createComment: async (ticketId, data) => {
    const response = await api.post(`/tickets/${ticketId}/comments`, data);
    return response.data;
  },

  updateComment: async (ticketId, commentId, data) => {
    const response = await api.patch(`/tickets/${ticketId}/comments/${commentId}`, data);
    return response.data;
  },

  deleteComment: async (ticketId, commentId) => {
    const response = await api.delete(`/tickets/${ticketId}/comments/${commentId}`);
    return response.data;
  },
};
