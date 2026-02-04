<template>
    <div v-if="loading" class="flex items-center justify-center h-64">
        <SpinnerIcon class-name="w-8 h-8 text-blue-600" />
    </div>

    <div v-else class="p-12">
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900">User Management</h1>
            <p class="text-gray-600 mt-2">Manage all users in the system</p>
        </div>

        <UsersTable :users="users" :reset-password-id="resetPasswordId" @user-click="handleUserClick"
            @reset-password="handleResetPassword" />

        <ConfirmModal :is-open="confirmModal.isOpen" :title="confirmModal.title" :message="confirmModal.message"
            confirm-text="Reset Password" cancel-text="Cancel" :is-loading="resetPasswordId === confirmModal.userId"
            @close="closeConfirmModal" @confirm="confirmResetPassword" />

        <InfoModal :is-open="passwordModal.isOpen" title="Password Reset Successfully" @close="closePasswordModal">
            <div class="space-y-3">
                <p class="text-sm text-gray-500">
                    New password for <span class="font-semibold text-gray-900">{{ passwordModal.userName }}</span>:
                </p>
                <div class="bg-gray-100 p-4 rounded-lg">
                    <p class="text-lg font-mono font-bold text-gray-900 break-all">
                        {{ passwordModal.password }}
                    </p>
                </div>
                <p class="text-sm text-amber-600 font-medium">
                    Please save this password and share it with the user securely.
                </p>
            </div>
        </InfoModal>
    </div>
</template>

<script setup>
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'
import UsersTable from '~/components/users/UsersTable.vue'
import ConfirmModal from '~/components/common/ConfirmModal.vue'
import InfoModal from '~/components/common/InfoModal.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const router = useRouter()
const toast = useToast()
const { users, loading, fetchUsers, resetPassword } = useUsers()

const resetPasswordId = ref(null)

const confirmModal = ref({
    isOpen: false,
    userId: null,
    userName: '',
    title: '',
    message: ''
})

const passwordModal = ref({
    isOpen: false,
    userName: '',
    password: ''
})

const handleUserClick = (userId) => {
    router.push(`/users/${userId}`)
}

const handleResetPassword = (userId, userName) => {
    confirmModal.value = {
        isOpen: true,
        userId,
        userName,
        title: 'Reset Password',
        message: `Are you sure you want to reset password for ${userName}?`
    }
}

const confirmResetPassword = async () => {
    const { userId, userName } = confirmModal.value
    resetPasswordId.value = userId
    closeConfirmModal()

    try {
        const response = await resetPassword(userId)
        const newPassword = response.new_password

        passwordModal.value = {
            isOpen: true,
            userName,
            password: newPassword
        }

        toast.success('Password reset successfully')
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to reset password')
    } finally {
        resetPasswordId.value = null
    }
}

const closeConfirmModal = () => {
    confirmModal.value = {
        isOpen: false,
        userId: null,
        userName: '',
        title: '',
        message: ''
    }
}

const closePasswordModal = () => {
    passwordModal.value = {
        isOpen: false,
        userName: '',
        password: ''
    }
}

onMounted(() => {
    fetchUsers()
})
</script>
async () => {
    try {
        await fetchUsers()
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch users')
    }
}
