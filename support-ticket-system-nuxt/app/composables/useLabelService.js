// Label Service API
export const useLabelService = () => {
  const { $api } = useNuxtApp()

  const getAll = (params = {}) => {
    return $api('/labels', { params })
  }

  const getById = (id) => {
    return $api(`/labels/${id}`)
  }

  const create = (data) => {
    return $api('/labels', {
      method: 'POST',
      body: data
    })
  }

  const update = (id, data) => {
    return $api(`/labels/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteLabel = (id) => {
    return $api(`/labels/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteLabel
  }
}
