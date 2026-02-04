<template>
    <div class="p-12">
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900">Ticket Logs</h1>
            <p class="text-gray-600 mt-2">
                View all ticket changes and activity history
            </p>
        </div>

        <TicketLogFilters :filters="filters" :users="users" @filter-change="handleFilterChange"
            @clear-filters="handleClearFilters" />

        <div v-if="loading && logs.length === 0" class="flex items-center justify-center py-12">
            <SpinnerIcon class-name="w-12 h-12 text-blue-600" />
        </div>
        <template v-else>
            <TicketLogTable :logs="logs" />

            <TicketPagination v-if="logs.length > 0" :pagination="pagination" @page-change="handlePageChange" />
        </template>
    </div>
</template>

<script setup>
import TicketLogFilters from '~/components/ticket-logs/TicketLogFilters.vue'
import TicketLogTable from '~/components/ticket-logs/TicketLogTable.vue'
import TicketPagination from '~/components/tickets/TicketPagination.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const { logs, users, loading, pagination, filters, fetchUsers, fetchLogs, updateFilters, clearFilters, changePage } = useTicketLogs()

onMounted(async () => {
    await fetchUsers()
    await fetchLogs()
})

watch(filters, async () => {
    await fetchLogs()
}, { deep: true })

const handleFilterChange = ({ name, value }) => {
    updateFilters(name, value)
}

const handleClearFilters = () => {
    clearFilters()
}

const handlePageChange = (newPage) => {
    changePage(newPage)
}
</script>
