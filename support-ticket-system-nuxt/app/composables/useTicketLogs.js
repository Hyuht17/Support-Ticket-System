// Ticket Logs State Management
export const useTicketLogs = () => {
    const logs = useState('ticketLogs', () => [])
    const users = useState('ticketLogsUsers', () => [])
    const loading = useState('ticketLogsLoading', () => false)
    const pagination = useState('ticketLogsPagination', () => ({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    }))
    const filters = useState('ticketLogsFilters', () => ({
        user_id: '',
        action: '',
        per_page: 10,
        page: 1,
    }))

    const ticketLogService = useTicketLogService()
    const userService = useUserService()
    const { showToast } = useToast()

    const fetchUsers = async () => {
        try {
            const response = await userService.getAll()
            users.value = response.data.data || []
        } catch (error) {
            console.error('Failed to fetch users:', error)
        }
    }

    const fetchLogs = async () => {
        loading.value = true
        try {
            const response = await ticketLogService.getAll(filters.value)

            if (response.data.data) {
                logs.value = response.data.data
                pagination.value = {
                    current_page: response.data.current_page,
                    last_page: response.data.last_page,
                    per_page: response.data.per_page,
                    total: response.data.total,
                }
            } else {
                logs.value = []
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error)
            showToast('Failed to load ticket logs', 'error')
            logs.value = []
        } finally {
            loading.value = false
        }
    }

    const updateFilters = (name, value) => {
        filters.value = {
            ...filters.value,
            [name]: value,
            page: 1,
        }
    }

    const clearFilters = () => {
        filters.value = {
            user_id: '',
            action: '',
            per_page: 10,
            page: 1,
        }
    }

    const changePage = (newPage) => {
        filters.value = {
            ...filters.value,
            page: newPage,
        }
    }

    return {
        logs,
        users,
        loading,
        pagination,
        filters,
        fetchUsers,
        fetchLogs,
        updateFilters,
        clearFilters,
        changePage,
    }
}
