<template>
    <tr class="hover:bg-gray-50 cursor-pointer" @click="handleRowClick">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            #{{ user.id }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">{{ user.email }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span :class="`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(user.role_id)}`">
                {{ getRoleName(user.role_id) }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(user.created_at) }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center justify-end gap-2">
                <button @click.stop="$emit('resetPassword', user.id, user.name)" :disabled="isResetting"
                    class="text-orange-600 hover:text-orange-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                    <SpinnerIcon v-if="isResetting" class-name="w-4 h-4" />
                    {{ isResetting ? 'Resetting...' : 'Reset Password' }}
                </button>
            </div>
        </td>
    </tr>
</template>

<script setup>
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    resetPasswordId: Number
})

const emit = defineEmits(['click', 'resetPassword'])

const isResetting = computed(() => props.resetPasswordId === props.user.id)

const getRoleName = (roleId) => {
    const roles = { 1: 'Admin', 2: 'Agent', 3: 'User' }
    return roles[roleId] || 'Unknown'
}

const getRoleBadgeClass = (roleId) => {
    const classes = {
        1: 'bg-purple-100 text-purple-800',
        2: 'bg-blue-100 text-blue-800',
        3: 'bg-gray-100 text-gray-800'
    }
    return classes[roleId] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
}

const handleRowClick = (e) => {
    if (!e.target.closest('button')) {
        emit('click')
    }
}
</script>
