<template>
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div v-for="(config, name) in filterOptions" :key="name">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ config.label }}
                </label>
                <select :name="name" :value="filters[name]" @change="$emit('filterChange', $event)"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option v-if="config.placeholder" value="">{{ config.placeholder }}</option>
                    <option v-for="option in config.options" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>

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
const props = defineProps({
    filters: {
        type: Object,
        required: true
    },
    categories: {
        type: Array,
        default: () => []
    }
})

defineEmits(['filterChange', 'clearFilters'])

const filterOptions = computed(() => ({
    status: {
        label: 'Status',
        placeholder: 'All Status',
        options: [
            { value: 'open', label: 'Open' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'closed', label: 'Closed' }
        ]
    },
    priority: {
        label: 'Priority',
        placeholder: 'All Priorities',
        options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' }
        ]
    },
    category_id: {
        label: 'Category',
        placeholder: 'All Categories',
        options: props.categories.map(cat => ({ value: cat.id.toString(), label: cat.name }))
    },
    per_page: {
        label: 'Per Page',
        placeholder: null,
        options: [
            { value: '10', label: '10' },
            { value: '25', label: '25' },
            { value: '50', label: '50' },
            { value: '100', label: '100' }
        ]
    }
}))
</script>
