<template>
  <form @submit.prevent="handleSubmit" class="mb-6">
    <div class="flex gap-3">
      <div class="flex-1">
        <textarea
          v-model="comment"
          placeholder="Add a comment..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="3"
        />
        <div class="mt-2 flex justify-end gap-2">
          <button
            type="button"
            @click="comment = ''"
            class="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-900"
            :disabled="isSubmitting"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="isCommentEmpty || isSubmitting" 
          >
            {{ isSubmitting ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
defineProps({
  isSubmitting: Boolean
})

const emit = defineEmits(['submit'])

const comment = ref('')

const isCommentEmpty = computed(() => {
  return !comment.value || !comment.value.trim()
})

const handleSubmit = () => {
  if (comment.value && comment.value.trim()) {
    emit('submit', comment.value)
    comment.value = ''
  }
}
</script>
