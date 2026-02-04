<template>
    <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <NuxtLink to="/tickets"
                class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeftIcon class-name="w-5 h-5" />
            </NuxtLink>
            <div>
                <div class="flex items-center gap-3">
                    <h1 class="text-2xl font-bold text-gray-900">#{{ ticketId }}</h1>
                    <StatusBadge :status="ticket.status" />
                    <PriorityBadge :priority="ticket.priority" />
                </div>
            </div>
        </div>
        <button v-if="canEditTicket(ticket)" @click="$emit('editToggle')"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            {{ isEditing ? 'Cancel' : 'Edit' }}
        </button>
    </div>
</template>

<script setup>
import ArrowLeftIcon from '~/components/icons/ArrowLeftIcon.vue'
import StatusBadge from './StatusBadge.vue'
import PriorityBadge from './PriorityBadge.vue'

defineProps({
    ticket: {
        type: Object,
        required: true
    },
    ticketId: {
        type: [String, Number],
        required: true
    },
    isEditing: Boolean
})

defineEmits(['editToggle'])

const { canEditTicket } = usePermissions()
</script>
