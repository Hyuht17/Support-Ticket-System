export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user, checkAuth } = useAuth()

  if (import.meta.server) {
    const headers = useRequestHeaders(['cookie'])
    
    try {
      const { authenticated, user: userData } = await $fetch('/api/check-auth', {
        headers: {
          cookie: headers.cookie || ''
        }
      })
      if (!authenticated) {
        return navigateTo('/login')
      }
      user.value = userData
    } catch {
      return navigateTo('/login')
    }
    return
  }

  if (!user.value) {
    const isAuthenticated = await checkAuth()
    if (!isAuthenticated) {
      return navigateTo('/login')
    }
  }
})
