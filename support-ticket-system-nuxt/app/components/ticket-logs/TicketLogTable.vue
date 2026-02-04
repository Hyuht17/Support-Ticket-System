<template>
    <div v-if="logs.length === 0" class="bg-white rounded-lg shadow-sm p-12 text-center">
        <p class="text-gray-500 text-lg">No logs found</p>
    </div>
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ticket
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Changes
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Timestamp
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <NuxtLink :to="`/tickets/${log.ticket_id}`"
                                class="text-blue-600 hover:text-blue-800 font-medium">
                                #{{ log.ticket_id }}
                            </NuxtLink>
                            <p v-if="log.ticket?.title" class="text-sm text-gray-500 truncate max-w-xs">
                                {{ log.ticket.title }}
                            </p>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div class="ml-3">
                                    <p class="text-sm font-medium text-gray-900">
                                        {{ log.user?.name || 'Unknown User' }}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        {{ log.user?.email }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="['px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', getActionBadgeColor(log.action)]">
                                {{ log.action.replace('_', ' ') }}
                            </span>
                        </td>
                        <td class="px-6 py-4">
                            <div v-if="log.changed_fields && Object.keys(log.changed_fields).length > 0" class="space-y-1">
                                <div v-for="[field, value] in Object.entries(log.changed_fields)" :key="field" class="text-sm">
                                    <span class="font-medium text-gray-700">{{ field }}:</span>
                                    <span class="text-green-600 ml-1">{{ value || 'null' }}</span>
                                </div>
                            </div>
                            <span v-else class="text-gray-400">No changes</span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ formatDate(log.created_at) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
defineProps({
    logs: {
        type: Array,
        required: true
    }
})

const getActionBadgeColor = (action) => {
    const colors = {
        'created': 'bg-green-100 text-green-800',
        'updated': 'bg-blue-100 text-blue-800',
        'status_changed': 'bg-yellow-100 text-yellow-800',
        'priority_changed': 'bg-orange-100 text-orange-800',
        'assigned': 'bg-purple-100 text-purple-800',
        'commented': 'bg-gray-100 text-gray-800',
    }
    return colors[action] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}
</script>