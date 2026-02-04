// Comment Service API
export const useCommentService = () => {
  const { $api } = useNuxtApp()

  const getComments = (ticketId) => {
    return $api(`/tickets/${ticketId}/comments`)
  }

  const create = (ticketId, data) => {
    return $api(`/tickets/${ticketId}/comments`, {
      method: 'POST',
      body: data
    })
  }

  const update = (ticketId, commentId, data) => {
    return $api(`/tickets/${ticketId}/comments/${commentId}`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteComment = (ticketId, commentId) => {
    return $api(`/tickets/${ticketId}/comments/${commentId}`, {
      method: 'DELETE'
    })
  }

  return {
    create,
    update,
    deleteComment,
    getComments
  }
}
