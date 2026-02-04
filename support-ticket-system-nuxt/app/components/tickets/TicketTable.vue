<template>
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Labels
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categories
                    </th>
                    <th class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                    </th>
                    <th v-if="canDeleteTicket()"
                        class="px-2 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50">
                    <td class="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{{ ticket.id }}
                    </td>
                    <td class="px-2 py-4 text-sm text-gray-900">
                        <NuxtLink :to="`/tickets/${ticket.id}`"
                            class="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            {{ ticket.title }}
                        </NuxtLink>
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                        {{ ticket.user?.name || 'N/A' }}
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap">
                        <StatusBadge :status="ticket.status" />
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap">
                        <PriorityBadge :priority="ticket.priority" />
                    </td>
                    <td class="py-4 whitespace-nowrap text-sm text-gray-700">
                        <div v-if="ticket.labels && ticket.labels.length > 0" class="flex flex-wrap gap-1">
                            <span v-for="label in ticket.labels" :key="label.id"
                                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                {{ label.name }}
                            </span>
                        </div>
                        <span v-else class="text-gray-400">-</span>
                    </td>
                    <td class="py-4 whitespace-nowrap text-sm text-gray-700">
                        <div v-if="ticket.categories && ticket.categories.length > 0" class="flex flex-wrap gap-1">
                            <span v-for="category in ticket.categories" :key="category.id"
                                class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                {{ category.name }}
                            </span>
                        </div>
                        <span v-else class="text-gray-400">-</span>
                    </td>
                    <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                        {{ formatDate(ticket.created_at) }}
                    </td>
                    <td v-if="canDeleteTicket()" class="px-2 py-4 whitespace-nowrap text-sm font-medium">
                        <button @click="$emit('delete', ticket.id)" class="text-red-600 hover:text-red-900">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'

defineProps({
    tickets: {
        type: Array,
        required: true
    }
})

defineEmits(['delete'])

const { canDeleteTicket } = usePermissions()

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
</script>
