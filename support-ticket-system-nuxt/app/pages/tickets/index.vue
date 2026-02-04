<template>
    <div class="p-12">
        <div class="mb-8 flex justify-between items-center">
            <h1 class="text-4xl font-bold text-gray-900">Tickets</h1>
            <button @click="navigateTo('/tickets/create')"
                class="bg-gray-100 hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
                + Create Ticket
            </button>
        </div>

        <TicketFilters :filters="filters" :categories="categories" @filter-change="handleFilterChange"
            @clear-filters="handleClearFilters" />

        <div v-if="loading && tickets.length === 0" class="flex items-center justify-center min-h-[400px]">
            <SpinnerIcon class-name="w-12 h-12 text-blue-600 animate-spin" />
        </div>

        <div v-else-if="tickets.length > 0">
            <TicketTable :tickets="tickets" @delete="handleDelete" />

            <TicketPagination :pagination="pagination" @page-change="handlePageChange" />
        </div>

        <div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
            <p class="text-gray-500 text-lg">No tickets found</p>
            <button @click="navigateTo('/tickets/create')" class="mt-4 text-blue-600 hover:text-blue-800 font-medium">
                Create your first ticket
            </button>
        </div>
    </div>
</template>

<script setup>
import TicketFilters from '~/components/tickets/TicketFilters.vue'
import TicketTable from '~/components/tickets/TicketTable.vue'
import TicketPagination from '~/components/tickets/TicketPagination.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const toast = useToast()
const { getAll: getTickets, deleteTicket } = useTicketService()
const { getAll: getCategories } = useCategoryService()

const tickets = ref([])
const categories = ref([])
const loading = ref(false)
const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
})

const filters = ref({
    status: '',
    priority: '',
    category_id: '',
    page: 1,
    per_page: 10,
})

const fetchTickets = async () => {
    loading.value = true
    try {
        const response = await getTickets(filters.value)
        if (response.data && Array.isArray(response.data)) {
            tickets.value = response.data
        } else if (response.data?.data && Array.isArray(response.data.data)) {
            tickets.value = response.data.data
            pagination.value = {
                current_page: response.data.current_page || 1,
                last_page: response.data.last_page || 1,
                per_page: response.data.per_page || 10,
                total: response.data.total || 0,
            }
        }
    } catch (error) {
        console.error('Failed to fetch tickets:', error)
        toast.error('Failed to load tickets')
    } finally {
        loading.value = false
    }
}

const fetchCategories = async () => {
    try {
        const response = await getCategories()
        categories.value = response.data || []
    } catch (error) {
        console.error('Failed to fetch categories:', error)
    }
}

const handleFilterChange = (e) => {
    const { name, value } = e.target
    filters.value = {
        ...filters.value,
        [name]: value,
        page: 1,
    }
}

const handleClearFilters = () => {
    filters.value = {
        status: '',
        priority: '',
        category_id: '',
        page: 1,
        per_page: 10,
    }
}

const handlePageChange = (newPage) => {
    filters.value = {
        ...filters.value,
        page: newPage,
    }
}

const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
        try {
            await deleteTicket(id)
            toast.success('Ticket deleted successfully')
            await fetchTickets()
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to delete ticket')
        }
    }
}

onMounted(() => {
    fetchCategories()
    fetchTickets()
})

watch(filters, () => {
    fetchTickets()
}, { deep: true })
</script>
