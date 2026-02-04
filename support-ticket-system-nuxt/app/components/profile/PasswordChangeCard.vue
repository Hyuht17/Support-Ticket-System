<template>
  <div class="bg-white rounded-lg shadow-sm p-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Change Password</h2>
      <button
        v-if="!isChangingPassword"
        @click="isChangingPassword = true"
        class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        Change Password
      </button>
    </div>

    <form v-if="isChangingPassword" @submit.prevent="handleSubmit" class="space-y-4">
      <div v-for="field in passwordFields" :key="field.name">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ field.label }}
        </label>
        <div class="relative">
          <LockIcon class-name="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="password"
            :name="field.name"
            v-model="passwordData[field.name]"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            :minlength="field.minLength || undefined"
          />
        </div>
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          :disabled="loading"
          class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <SpinnerIcon v-if="loading" class-name="w-4 h-4 animate-spin" />
          {{ loading ? 'Updating...' : 'Update Password' }}
        </button>
        <button
          type="button"
          @click="handleCancel"
          :disabled="loading"
          class="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>

    <p v-else class="text-gray-500">
      Click "Change Password" to update your password
    </p>
  </div>
</template>

<script setup>
import LockIcon from '~/components/icons/LockIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

const props = defineProps({
  logout: {
    type: Function,
    required: true
  }
})

const { updatePassword } = useUserService()
const toast = useToast()

const isChangingPassword = ref(false)
const loading = ref(false)
const passwordData = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const passwordFields = [
  {
    name: 'current_password',
    label: 'Current Password',
    minLength: null
  },
  {
    name: 'password',
    label: 'New Password',
    minLength: 8
  },
  {
    name: 'password_confirmation',
    label: 'Confirm New Password',
    minLength: 8
  }
]

const handleSubmit = async () => {
  if (passwordData.value.password !== passwordData.value.password_confirmation) {
    toast.error('Passwords do not match')
    return
  }

  loading.value = true
  try {
    await updatePassword(passwordData.value)
    toast.success('Password updated successfully. Please login again.')
    passwordData.value = {
      current_password: '',
      password: '',
      password_confirmation: '',
    }
    isChangingPassword.value = false
    setTimeout(() => {
      props.logout()
    }, 1500)
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update password')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  isChangingPassword.value = false
  passwordData.value = {
    current_password: '',
    password: '',
    password_confirmation: '',
  }
}
</script>
