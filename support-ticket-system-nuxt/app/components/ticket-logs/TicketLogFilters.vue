<template>
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- User Filter -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    User
                </label>
                <select :value="filters.user_id || ''" @change="handleFilterChange('user_id', $event.target.value)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Users</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.name }}
                    </option>
                </select>
            </div>

            <!-- Action Filter -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Action
                </label>
                <select :value="filters.action || ''" @change="handleFilterChange('action', $event.target.value)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">All Actions</option>
                    <option v-for="option in actionOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <!-- Per Page -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Per Page
                </label>
                <select :value="filters.per_page || 10" @change="handleFilterChange('per_page', $event.target.value)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <!-- Clear Button -->
            <div class="flex items-end">
                <button @click="$emit('clearFilters')"
                    class="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors">
                    Clear Filters
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    filters: {
        type: Object,
        required: true
    },
    users: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['filterChange', 'clearFilters'])

const actionOptions = [
    { value: 'created', label: 'Created' },
    { value: 'updated', label: 'Updated' },
    { value: 'status_changed', label: 'Status Changed' },
    { value: 'priority_changed', label: 'Priority Changed' },
    { value: 'assigned', label: 'Assigned' },
    { value: 'commented', label: 'Commented' },
]

const handleFilterChange = (name, value) => {
    emit('filterChange', { name, value })
}
</script>
