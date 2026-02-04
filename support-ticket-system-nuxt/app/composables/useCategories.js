// Categories State Management
export const useCategories = () => {
  const categories = useState('categories', () => [])
  const loading = useState('categoriesLoading', () => false)
  const isInitialized = useState('categoriesInitialized', () => false)

  const categoryService = useCategoryService()
  const { showToast } = useToast()

  const fetchCategories = async (force = false) => {
    if (isInitialized.value && !force) {
      return
    }

    loading.value = true
    try {
      const response = await categoryService.getAll()
      categories.value = response.data || []
      isInitialized.value = true
    } catch (error) {
      console.error('Failed to fetch categories:', error)
      categories.value = []
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (data) => {
    const response = await categoryService.create(data)
    await fetchCategories(true)
    return response
  }

  const updateCategory = async (id, data) => {
    const response = await categoryService.update(id, data)
    await fetchCategories(true)
    return response
  }

  const deleteCategory = async (id) => {
    const response = await categoryService.deleteCategory(id)
    await fetchCategories(true)
    return response
  }

  return {
    categories,
    loading,
    isInitialized,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
