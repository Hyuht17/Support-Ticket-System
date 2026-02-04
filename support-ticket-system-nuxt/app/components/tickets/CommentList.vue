<template>
  <div>
    <CommentForm :is-submitting="isSubmitting" @submit="$emit('addComment', $event)" />

    <div v-if="comments && comments.length > 0" class="space-y-4">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
      >
        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <span class="text-green-600 font-semibold text-sm">
            {{ comment.user?.name?.charAt(0).toUpperCase() || 'U' }}
          </span>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <span class="font-medium text-gray-900">{{ comment.user?.name || 'Unknown' }}</span>
            </div>
            <div v-if="canEditComment(comment) || canDeleteComment(comment)" class="flex gap-2">
              <button
                v-if="canEditComment(comment)"
                @click="handleStartEdit(comment)"
                class="text-xs text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                v-if="canDeleteComment(comment)"
                @click="handleDelete(comment.id)"
                class="text-xs text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>

          <div v-if="editingCommentId === comment.id" class="mt-2">
            <textarea
              v-model="editText"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows="3"
            />
            <div class="flex gap-2 mt-2">
              <button
                @click="handleSaveEdit(comment.id)"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
              >
                Save
              </button>
              <button
                @click="handleCancelEdit"
                class="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded"
              >
                Cancel
              </button>
            </div>
          </div>
          <p v-else class="text-sm text-gray-700 mt-1">{{ comment.content }}</p>

          <p class="text-xs text-gray-500 mt-1">{{ formatDate(comment.created_at) }}</p>
        </div>
      </div>
    </div>

    <p v-else class="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
  </div>
</template>

<script setup>
import CommentForm from './CommentForm.vue'

const props = defineProps({
  comments: Array,
  formatDate: Function,
  isSubmitting: Boolean
})

const emit = defineEmits(['addComment', 'editComment', 'deleteComment'])

const { canEditComment, canDeleteComment } = usePermissions()

const editingCommentId = ref(null)
const editText = ref('')

const handleStartEdit = (comment) => {
  editingCommentId.value = comment.id
  editText.value = comment.content
}

const handleCancelEdit = () => {
  editingCommentId.value = null
  editText.value = ''
}

const handleSaveEdit = async (commentId) => {
  if (!editText.value.trim()) return

  try {
    emit('editComment', commentId, editText.value)
    editingCommentId.value = null
    editText.value = ''
  } catch (error) {
    console.error('Failed to update comment:', error)
  }
}

const handleDelete = async (commentId) => {
  if (!window.confirm('Are you sure you want to delete this comment?')) {
    return
  }

  try {
    emit('deleteComment', commentId)
  } catch (error) {
    console.error('Failed to delete comment:', error)
  }
}
</script>
