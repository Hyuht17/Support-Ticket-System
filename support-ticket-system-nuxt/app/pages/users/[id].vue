<template>
    <div v-if="loading && !currentUser" class="flex items-center justify-center h-64">
        <SpinnerIcon class-name="w-8 h-8 text-blue-600" />
    </div>

    <div v-else class="p-12 max-w-4xl">
        <div class="mb-8">
            <NuxtLink to="/users" class="hover:text-blue-800 font-medium mb-4 inline-block">
                <ArrowLeftIcon class-name="w-5 h-5" />
            </NuxtLink>
            <h1 class="text-4xl font-bold text-gray-900">User Details</h1>
        </div>

        <UserInfoCard v-if="currentUser" :user="currentUser" :is-resetting="isResetting"
            @update="fetchUserDetails" @reset-password="handleResetPassword" />

        <ConfirmModal :is-open="confirmModal.isOpen" title="Reset Password"
            :message="`Are you sure you want to reset password for ${currentUser?.name}?`" confirm-text="Reset Password"
            cancel-text="Cancel" :is-loading="isResetting" @close="closeConfirmModal" @confirm="confirmResetPassword" />

        <InfoModal :is-open="passwordModal.isOpen" title="Password Reset Successfully" @close="closePasswordModal">
            <div class="space-y-3">
                <p class="text-sm text-gray-500">
                    New password for <span class="font-semibold text-gray-900">{{ currentUser?.name }}</span>:
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
import ArrowLeftIcon from '~/components/icons/ArrowLeftIcon.vue'
import UserInfoCard from '~/components/users/UserInfoCard.vue'
import ConfirmModal from '~/components/common/ConfirmModal.vue'
import InfoModal from '~/components/common/InfoModal.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { getById: getUser } = useUserService()
const { resetPassword } = useUsers()

const id = route.params.id
const currentUser = ref(null)
const loading = ref(false)
const isResetting = ref(false)

const confirmModal = ref({
    isOpen: false
})

const passwordModal = ref({
    isOpen: false,
    password: ''
})

const fetchUserDetails = async () => {
    loading.value = true
    try {
        const response = await getUser(id)
        currentUser.value = response.data
    } catch (error) {
        toast.error('Failed to load user details')
        router.push('/users')
    } finally {
        loading.value = false
    }
}

const handleResetPassword = () => {
    confirmModal.value = { isOpen: true }
}

const confirmResetPassword = async () => {
    isResetting.value = true
    closeConfirmModal()

    try {
        const response = await resetPassword(id)
        const newPassword = response.new_password

        passwordModal.value = {
            isOpen: true,
            password: newPassword
        }

        toast.success('Password reset successfully')
    } catch (error) {
        toast.error(error.response?.message || 'Failed to reset password')
    } finally {
        isResetting.value = false
    }
}

const closeConfirmModal = () => {
    confirmModal.value = { isOpen: false }
}

const closePasswordModal = () => {
    passwordModal.value = {
        isOpen: false,
        password: ''
    }
}

onMounted(() => {
    fetchUserDetails()
})
</script>
