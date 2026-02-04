// Composable cho authentication
export const useAuth = () => {
    const user = useState('user', () => null)
    const loading = useState('authLoading', () => true)
    const { $api } = useNuxtApp()

    const checkAuth = async () => {
        loading.value = true

        try {
            const response = await $api('/auth/me')
            if (response && response.success && response.data) {
                user.value = response.data
                loading.value = false
                return true
            }
            user.value = null
            loading.value = false
            return false
        } catch (error) {
            const status = error?.status || error?.statusCode || error?.response?.status

            if (status === 401) {
                try {
                    await $api('/auth/refresh', { method: 'GET' })
                    const retryResponse = await $api('/auth/me')
                    if (retryResponse && retryResponse.success && retryResponse.data) {
                        user.value = retryResponse.data
                        loading.value = false
                        return true
                    }
                } catch (refreshError) {
                    user.value = null
                    loading.value = false
                    return false
                }
            }

            user.value = null
            loading.value = false
            return false
        }
    }

    const login = async (credentials) => {
        const response = await $api('/auth/login', {
            method: 'POST',
            body: credentials
        })
        if (response.success) {
            await checkAuth()
        }
        return response
    }

    // Register
    const register = async (data) => {
        const response = await $api('/auth/register', {
            method: 'POST',
            body: data
        })
        return response
    }

    // Logout
    const logout = async () => {
        await $api('/auth/logout', { method: 'POST' })
        user.value = null
        navigateTo('/login')
    }

    // Update profile
    const updateProfile = (updatedUser) => {
        user.value = updatedUser
    }

    return {
        user,
        loading,
        checkAuth,
        login,
        register,
        logout,
        updateProfile
    }
}
