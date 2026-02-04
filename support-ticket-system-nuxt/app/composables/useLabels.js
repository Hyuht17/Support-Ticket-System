// Labels State Management
export const useLabels = () => {
  const labels = useState('labels', () => [])
  const loading = useState('labelsLoading', () => false)
  const isInitialized = useState('labelsInitialized', () => false)

  const labelService = useLabelService()
  const { showToast } = useToast()

  const fetchLabels = async (force = false) => {
    if (isInitialized.value && !force) {
      return
    }

    loading.value = true
    try {
      const response = await labelService.getAll()
      labels.value = response.data || []
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to fetch labels:', error)
      labels.value = []
    } finally {
      loading.value = false
    }
  }

  const createLabel = async (data) => {
    const response = await labelService.create(data)
    await fetchLabels(true)
    return response
  }

  const updateLabel = async (id, data) => {
    const response = await labelService.update(id, data)
    await fetchLabels(true)
    return response
  }

  const deleteLabel = async (id) => {
    const response = await labelService.deleteLabel(id)
    await fetchLabels(true)
    return response
  }

  return {
    labels,
    loading,
    isInitialized,
    fetchLabels,
    createLabel,
    updateLabel,
    deleteLabel,
  }
}
