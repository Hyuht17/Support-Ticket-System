export const useDashboard = () => {
  const stats = useState('dashboardStats', () => ({
    total: 0,
    open: 0,
    in_progress: 0,
    closed: 0,
  }))
  const loading = useState('dashboardLoading', () => false)
  const isInitialized = useState('dashboardInitialized', () => false)

  const { getTicketStats } = useTicketService()

  const refreshStats = async (force = false) => {
    if (isInitialized.value && !force) {
      return
    }

    loading.value = true
    try {
      const response = await getTicketStats()
      if (response?.data) {
        stats.value = response.data
        isInitialized.value = true
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    isInitialized,
    refreshStats,
  }
}
