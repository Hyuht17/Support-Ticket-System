<template>
  <div class="bg-white rounded-lg shadow-sm p-8 mb-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Profile Information</h2>
      <button
        v-if="!isEditing"
        @click="isEditing = true"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Edit Profile
      </button>
    </div>

    <form v-if="isEditing" @submit.prevent="handleSubmit" class="space-y-4">
      <div v-for="field in formFields" :key="field.name">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ field.label }}
        </label>
        <div class="relative">
          <component 
            :is="field.icon" 
            class-name="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
          />
          <input
            :type="field.type"
            :name="field.name"
            v-model="formData[field.name]"
            class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :required="field.required"
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
          {{ loading ? 'Saving...' : 'Save Changes' }}
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

    <div v-else class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-500 mb-1">Name</label>
        <p class="text-lg text-gray-900">{{ user?.name }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
        <p class="text-lg text-gray-900">{{ user?.email }}</p>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-500 mb-1">Role</label>
        <span class="inline-flex px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {{ getRoleName(user?.role_id) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserIcon from '~/components/icons/UserIcon.vue'
import EmailIcon from '~/components/icons/EmailIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const { update } = useUserService()
const { updateProfile: updateAuthProfile } = useAuth()
const toast = useToast()

const isEditing = ref(false)
const loading = ref(false)
const formData = ref({
  name: props.user?.name || '',
  email: props.user?.email || '',
})

const formFields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    icon: UserIcon,
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: EmailIcon,
    required: true
  }
]

watch(() => props.user, (newUser) => {
  if (newUser && !isEditing.value) {
    formData.value = {
      name: newUser.name || '',
      email: newUser.email || '',
    }
  }
}, { immediate: true })

const handleSubmit = async () => {
  loading.value = true
  try {
    await update(props.user.id, formData.value)
    updateAuthProfile({ ...props.user, ...formData.value })
    toast.success('Profile updated successfully')
    isEditing.value = false
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to update profile')
  } finally {
    loading.value = false
  }
}

const handleCancel = () => {
  isEditing.value = false
  formData.value = {
    name: props.user?.name || '',
    email: props.user?.email || '',
  }
}

const getRoleName = (roleId) => {
  const roles = { 1: 'Admin', 2: 'Agent', 3: 'User' }
  return roles[roleId] || 'Unknown'
}
</script>
