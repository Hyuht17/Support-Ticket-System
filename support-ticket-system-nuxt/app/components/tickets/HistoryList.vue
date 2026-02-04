<template>
    <div class="space-y-4">
        <div v-if="logs.length > 0">
            <div v-for="log in logs" :key="log.id"
                class="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span class="text-blue-600 font-semibold text-sm">
                        {{ log.user?.name?.charAt(0).toUpperCase() || 'U' }}
                    </span>
                </div>
                <div class="flex-1">
                    <div class="text-sm">
                        <span class="font-medium text-gray-900">
                            {{ log.user?.name || 'Unknown' }}
                        </span>
                        <span class="text-gray-600 ml-1">{{ formatLogAction(log).text }}</span>
                    </div>

                    <div v-if="formatLogAction(log).changes && formatLogAction(log).changes.length > 0"
                        class="mt-2 ml-4 space-y-1">
                        <div v-for="(change, idx) in formatLogAction(log).changes" :key="idx"
                            class="text-xs text-gray-600 flex items-start gap-2">
                            <span class="text-gray-400">•</span>
                            <div>
                                <span class="font-medium">{{ change.field }}</span>
                                <span v-if="change.new !== null" class="mx-1">
                                    <span class="text-green-600">
                                        {{ getDisplayValue(change) }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-gray-500 mt-1">
                        {{ formatDate(log.created_at) }}
                    </p>
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500 text-sm">No activity yet</p>
    </div>
</template>

<script setup>
defineProps({
    logs: {
        type: Array,
        required: true
    },
    formatDate: Function
})

const formatLogAction = (log) => {
    if (log.action === 'created') {
        return {
            text: 'created this ticket',
            changes: null
        }
    }

    if (log.action === 'updated' && log.changed_fields) {
        const fields = log.changed_fields
        const changes = []

        if (fields.status) {
            changes.push({ field: 'Status', new: fields.status })
        }
        if (fields.priority) {
            changes.push({ field: 'Priority', new: fields.priority })
        }
        if (fields.title) {
            changes.push({ field: 'Title', new: fields.title })
        }
        if (fields.description) {
            changes.push({ field: 'Description', old: null, new: null })
        }
        if (fields.assigned_to_user_id) {
            changes.push({ field: 'Assignee', new: fields.assigned_to_user_id })
        }
        if ('attachment' in fields) {
            changes.push({ field: 'Attachment', new: fields.attachment })
        }

        if (changes.length === 1) {
            const change = changes[0]
            if (change.field === 'Description') {
                return { text: `changed the ${change.field}`, changes: null }
            } else if (change.field === 'Attachment') {
                if (change.new === null) {
                    return { text: 'removed attachments', changes: null }
                }
                return { text: 'add attachments', changes: changes }
            }
            return { text: `changed the ${change.field} to '${change.new}'`, changes: null }
        } else if (changes.length > 1) {
            return { text: `updated ${changes.length} fields`, changes: changes }
        }

        return { text: 'updated ticket', changes: null }
    }

    return { text: log.action, changes: null }
}

const getDisplayValue = (change) => {
    let displayValue = change.new

    if (change.field === 'Attachment' && change.new) {
        try {
            const files = JSON.parse(change.new)
            if (Array.isArray(files) && files.length > 0) {
                displayValue = files.map(f => f.original_name).join(', ')
            }
        } catch (e) {
            // Keep original value if parsing fails
        }
    }

    return displayValue
}
</script>
