// User Service API
export const useUserService = () => {
  const { $api } = useNuxtApp()

  const getAll = (params = {}) => {
    return $api('/users', { params })
  }

  const getById = (id) => {
    return $api(`/users/${id}`)
  }

  const create = (data) => {
    return $api('/users', {
      method: 'POST',
      body: data
    })
  }

  const update = (id, data) => {
    return $api(`/users/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteUser = (id) => {
    return $api(`/users/${id}`, {
      method: 'DELETE'
    })
  }

  const updateProfile = (data) => {
    return $api('/users/profile', {
      method: 'PATCH',
      body: data
    })
  }

  const updatePassword = (data) => {
    return $api('/users/profile/password', {
      method: 'PUT',
      body: data
    })
  }

  const searchAgents = (keyword) => {
    return $api('/users/agents', {
      params: { keyword }
    })
  }

  const resetPassword = async (userId) => {
    try {
      const response = await $api(`/users/${userId}/password`, {
        method: 'PUT'
      })
      return response
    } catch (error) {
      console.error('Failed to reset password:', error)
      throw error
    }
  }

  return {
    getAll,
    getById,
    create,
    update,
    deleteUser,
    updateProfile,
    updatePassword,
    searchAgents,
    resetPassword
  }
}
