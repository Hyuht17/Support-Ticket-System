// Category Service API
export const useCategoryService = () => {
  const { $api } = useNuxtApp()

  const getAll = (params = {}) => {
    return $api('/categories', { params })
  }

  const getById = (id) => {
    return $api(`/categories/${id}`)
  }

  const create = (data) => {
    return $api('/categories', {
      method: 'POST',
      body: data
    })
  }

  const update = (id, data) => {
    return $api(`/categories/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteCategory = (id) => {
    return $api(`/categories/${id}`, {
      method: 'DELETE'
    })
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteCategory
  }
}
