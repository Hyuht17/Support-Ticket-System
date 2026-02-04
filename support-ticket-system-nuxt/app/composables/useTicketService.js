export const useTicketService = () => {
  const { $api } = useNuxtApp()

  const getAll = (params = {}) => {
    return $api('/tickets', { params })
  }

  const getById = (id) => {
    return $api(`/tickets/${id}`)
  }

  const create = (data) => {
    return $api('/tickets', {
      method: 'POST',
      body: data
    })
  }

  const update = (id, data) => {
    if (data instanceof FormData) {
      data.append('_method', 'PATCH')
      return $api(`/tickets/${id}`, {
        method: 'POST',
        body: data
      })
    }
    
    return $api(`/tickets/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteTicket = (id) => {
    return $api(`/tickets/${id}`, {
      method: 'DELETE'
    })
  }

  const getLogs = (id) => {
    return $api(`/tickets/${id}/logs`)
  }

  const getTicketStats = () => {
    return $api('/tickets/stats')
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteTicket,
    getLogs,
    getTicketStats
  }
}
