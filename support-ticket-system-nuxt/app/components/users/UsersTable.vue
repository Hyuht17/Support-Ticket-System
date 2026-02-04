<template>
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div v-if="users && users.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <UsersTableHeader />
                <tbody class="bg-white divide-y divide-gray-200">
                    <UsersTableRow v-for="user in users" :key="user.id" :user="user"
                        :reset-password-id="resetPasswordId" @click="$emit('userClick', user.id)"
                        @reset-password="(userId, userName) => $emit('resetPassword', userId, userName)" />
                </tbody>
            </table>
        </div>

        <div v-else class="text-center py-12">
            <p class="text-gray-500">No users found</p>
        </div>
    </div>
</template>

<script setup>
import UsersTableHeader from './UsersTableHeader.vue'
import UsersTableRow from './UsersTableRow.vue'

defineProps({
    users: {
        type: Array,
        default: () => []
    },
    resetPasswordId: Number
})

defineEmits(['userClick', 'resetPassword'])
</script>
