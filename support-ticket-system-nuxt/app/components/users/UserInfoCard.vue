<template>
    <div class="bg-white rounded-lg shadow-sm p-8 mb-6">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-semibold text-gray-900">User Information</h2>
            <div class="flex gap-3">
                <template v-if="!isEditing">
                    <button @click="isEditing = true"
                        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        Edit User
                    </button>
                    <button @click="$emit('resetPassword')" :disabled="isResetting"
                        class="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                        <SpinnerIcon v-if="isResetting" class-name="w-4 h-4" />
                        {{ isResetting ? 'Resetting...' : 'Reset Password' }}
                    </button>
                </template>
            </div>
        </div>

        <form v-if="isEditing" @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Role
                </label>
                <select v-model="formData.role_id" name="role_id"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required>
                    <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                    </option>
                </select>
            </div>

            <div class="flex gap-3 pt-4">
                <button type="submit" :disabled="loading"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    <SpinnerIcon v-if="loading" class-name="w-4 h-4" />
                    {{ loading ? 'Saving...' : 'Save Changes' }}
                </button>
                <button type="button" @click="handleCancel" :disabled="loading"
                    class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50">
                    Cancel
                </button>
            </div>
        </form>

        <div v-else class="space-y-4">
            <div v-for="field in displayFields" :key="field.label">
                <label class="block text-sm font-medium text-gray-500 mb-1">
                    {{ field.label }}
                </label>
                <span v-if="field.isRole"
                    class="inline-flex px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {{ getRoleName(field.value) }}
                </span>
                <p v-else class="text-lg text-gray-900">{{ field.value }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    isResetting: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update', 'resetPassword'])

const toast = useToast()
const { update: updateUser } = useUserService()

const isEditing = ref(false)
const loading = ref(false)

const formData = ref({
    role_id: props.user?.role_id || ''
})

const roleOptions = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Agent' },
    { value: 3, label: 'User' }
]

const displayFields = computed(() => [
    { label: 'ID', value: `#${props.user?.id}` },
    { label: 'Name', value: props.user?.name },
    { label: 'Email', value: props.user?.email },
    {
        label: 'Role',
        value: props.user?.role_id,
        isRole: true
    },
    {
        label: 'Joined Date',
        value: props.user?.created_at ? new Date(props.user.created_at).toLocaleString() : 'N/A'
    },
    {
        label: 'Last Updated',
        value: props.user?.updated_at ? new Date(props.user.updated_at).toLocaleString() : 'N/A'
    }
])

const getRoleName = (roleId) => {
    const roles = { 1: 'Admin', 2: 'Agent', 3: 'User' }
    return roles[roleId] || 'Unknown'
}

const handleSubmit = async () => {
    loading.value = true
    try {
        await updateUser(props.user.id, formData.value)
        toast.success('User updated successfully')
        isEditing.value = false
        emit('update')
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update user')
    } finally {
        loading.value = false
    }
}

const handleCancel = () => {
    isEditing.value = false
    formData.value = {
        role_id: props.user?.role_id || ''
    }
}

watch(() => props.user, (newUser) => {
    if (newUser) {
        formData.value = {
            role_id: newUser.role_id || ''
        }
    }
}, { immediate: true })
</script>
