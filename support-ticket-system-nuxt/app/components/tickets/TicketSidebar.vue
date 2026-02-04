<template>
    <div class="space-y-4">
        <div class="bg-white rounded-lg shadow-sm p-6 space-y-6">
            <div v-if="isEditing">
                <AgentSearchSelect v-if="canAssignTicket()" :model-value="formData.assigned_to_user_id"
                    @change="handleChange('assigned_to_user_id', $event.target.value)" label="Assignee" />
                <FormSelect label="Status" name="status" :model-value="formData.status"
                    @update:model-value="handleChange('status', $event)" :options="statusOptions" required
                    :class="canAssignTicket() ? 'mt-4' : ''" />
                <FormSelect label="Priority" name="priority" :model-value="formData.priority"
                    @update:model-value="handleChange('priority', $event)" :options="priorityOptions" required
                    class="mt-4" />
                <div class="mt-4">
                    <FormCheckboxGroup label="Labels" :options="availableLabels" :selected-values="formData.labels"
                        field-name="labels" @change="$emit('checkboxChange', $event, 'labels')" />
                </div>
                <div class="mt-4">
                    <FormCheckboxGroup label="Categories" :options="availableCategories"
                        :selected-values="formData.categories" field-name="categories"
                        @change="$emit('checkboxChange', $event, 'categories')" />
                </div>
            </div>

            <div v-else>
                <div class="pb-6 border-b border-gray-200">
                    <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        People
                    </h3>

                    <div v-for="(person, index) in peopleItems" :key="index"
                        :class="index < peopleItems.length - 1 ? 'mb-4' : ''">
                        <label class="text-xs font-medium text-gray-500 block mb-2">
                            {{ person.label }}
                        </label>
                        <div class="flex items-center gap-2">
                            <div :class="`w-6 h-6 rounded-full ${person.bgColor} flex items-center justify-center`">
                                <span :class="`${person.textColor} font-semibold text-xs`">
                                    {{ person.user?.name?.charAt(0).toUpperCase() || 'U' }}
                                </span>
                            </div>
                            <span class="text-sm text-gray-900">
                                {{ person.user?.name || person.fallback }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Dates Section -->
                <div class="pb-6 pt-6 border-b border-gray-200">
                    <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        Dates
                    </h3>

                    <div class="space-y-3 text-sm">
                        <div v-for="(dateItem, index) in dateItems" :key="index">
                            <label class="text-xs font-medium text-gray-500 block mb-1">
                                {{ dateItem.label }}
                            </label>
                            <span class="text-gray-900">{{ formatDate(dateItem.value) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Labels Section -->
                <div v-if="ticket.labels && ticket.labels.length > 0" class="pb-6 pt-6 border-b border-gray-200">
                    <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        Labels
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="label in ticket.labels" :key="label.id"
                            class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                            {{ label.name }}
                        </span>
                    </div>
                </div>

                <!-- Categories Section -->
                <div v-if="ticket.categories && ticket.categories.length > 0" class="pt-6">
                    <h3 class="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">
                        Categories
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="category in ticket.categories" :key="category.id"
                            class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                            {{ category.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import FormSelect from '~/components/form/FormSelect.vue'
import FormCheckboxGroup from '~/components/form/FormCheckboxGroup.vue'
import AgentSearchSelect from '~/components/form/AgentSearchSelect.vue'

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    },
    isEditing: Boolean,
    formData: Object,
    statusOptions: Array,
    priorityOptions: Array,
    availableLabels: Array,
    availableCategories: Array,
    formatDate: Function
})

const emit = defineEmits(['change', 'checkboxChange'])

const { canAssignTicket } = usePermissions()

const handleChange = (name, value) => {
    emit('change', { target: { name, value } })
}

const peopleItems = computed(() => [
    {
        label: 'Assignee',
        user: props.ticket?.assigned_to,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600',
        fallback: 'Unassigned'
    },
    {
        label: 'Reporter',
        user: props.ticket?.user,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600',
        fallback: 'Unknown'
    }
])

const dateItems = computed(() => {
    const items = [
        {
            label: 'Created',
            value: props.ticket?.created_at
        },
        {
            label: 'Updated',
            value: props.ticket?.updated_at
        }
    ]

    if (props.ticket?.due_date) {
        items.unshift({
            label: 'Due Date',
            value: props.ticket.due_date
        })
    }

    if (props.ticket?.start_date) {
        items.push({
            label: 'Start Date',
            value: props.ticket.start_date
        })
    }

    return items
})
</script>
