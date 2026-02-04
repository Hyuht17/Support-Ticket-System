<template>
    <div class="bg-white rounded-lg shadow-sm p-6">
        <form v-if="isEditing" @submit.prevent="$emit('submit', $event)" class="space-y-4">
            <FormInput label="Title" name="title" :model-value="formData.title"
                @update:model-value="(value) => $emit('update-field', 'title', value)" required />
            <FormTextarea label="Description" name="description" :model-value="formData.description"
                @update:model-value="(value) => $emit('update-field', 'description', value)" required />
            <div class="flex gap-3 pt-4">
                <button type="submit" :disabled="submitting"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    <SpinnerIcon v-if="submitting" class-name="w-4 h-4" />
                    {{ submitting ? 'Saving...' : 'Save Changes' }}
                </button>
                <button type="button" @click="$emit('cancel')" :disabled="submitting"
                    class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Cancel
                </button>
            </div>
        </form>

        <div v-else>
            <h2 class="text-xl font-semibold text-gray-900 mb-6">{{ ticket.title }}</h2>

            <!-- Details Section -->
            <div class="mb-6 pb-6 border-b border-gray-200">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Details</h3>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div v-for="item in visibleDetails" :key="item.label">
                        <span class="text-gray-500">{{ item.label }}:</span>
                        <component v-if="item.component" :is="item.component" v-bind="item.props" class="ml-2" />
                        <div v-else-if="item.isLabels" class="flex flex-wrap gap-2 mt-2">
                            <span v-for="label in ticket.labels" :key="label.id"
                                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                {{ label.name }}
                            </span>
                        </div>
                        <span v-else class="ml-2 text-gray-900">{{ item.value }}</span>
                    </div>
                </div>
            </div>

            <!-- Description Section -->
            <div>
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Description</h3>
                <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ ticket.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import FormInput from '~/components/form/FormInput.vue'
import FormTextarea from '~/components/form/FormTextarea.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    },
    isEditing: Boolean,
    submitting: Boolean,
    formData: Object
})

defineEmits(['submit', 'cancel', 'update-field'])

const visibleDetails = computed(() => {
    const details = [
        {
            label: 'Type',
            value: 'Task'
        },
        {
            label: 'Priority',
            component: PriorityBadge,
            props: { priority: props.ticket?.priority }
        },
        {
            label: 'Status',
            component: StatusBadge,
            props: { status: props.ticket?.status }
        }
    ]

    if (props.ticket?.labels && props.ticket.labels.length > 0) {
        details.push({
            label: 'Labels',
            isLabels: true
        })
    }

    return details
})
</script>
