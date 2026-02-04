<template>
    <div v-if="items.length === 0" class="bg-white rounded-lg shadow-sm p-12 text-center">
        <p class="text-gray-500 text-lg">No {{ itemName }}s found</p>
    </div>
    <div v-else class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created At
                        </th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{{ item.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span v-if="showBadge"
                                :class="['px-2.5 py-1 text-xs font-medium rounded', 
                                    itemName === 'label' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800']">
                                {{ item.name }}
                            </span>
                            <span v-else class="text-sm font-medium text-gray-900">
                                {{ item.name }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ formatDate(item.created_at) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div class="flex items-center justify-end gap-2">
                                <button @click="$emit('edit', item)"
                                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    :title="`Edit ${itemName}`">
                                    Edit
                                </button>
                                <button @click="$emit('delete', item.id)"
                                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    :title="`Delete ${itemName}`">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
defineProps({
    items: {
        type: Array,
        default: () => []
    },
    itemName: {
        type: String,
        default: 'item'
    },
    showBadge: {
        type: Boolean,
        default: false
    }
})

defineEmits(['edit', 'delete'])

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}
</script>
