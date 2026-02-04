// Ticket Log Service API
export const useTicketLogService = () => {
  const { $api } = useNuxtApp()

  const getAll = (params = {}) => {
    return $api('/ticket-logs', {
      params
    })
  }

  return {
    getAll
  }
}
