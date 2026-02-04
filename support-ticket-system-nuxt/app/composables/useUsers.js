export const useUsers = () => {
  const users = useState('users', () => [])
  const loading = useState('users-loading', () => false)
  const { getAll, resetPassword: resetPasswordService } = useUserService()

  const fetchUsers = async (params = {}) => {
    loading.value = true
    try {
      const response = await getAll(params)
      users.value = response.data.data || []
      return response
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (userId) => {
    try {
      const response = await resetPasswordService(userId)
      return response
    } catch (error) {
      console.error('Failed to reset password:', error)
      throw error
    }
  }

  return {
    users,
    loading,
    fetchUsers,
    resetPassword
  }
}
