<template>
    <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="border-b border-gray-200 mb-6">
            <div class="flex gap-6">
                <button @click="handleTabClick('comments')" :class="[
                    'pb-3 px-1 text-sm font-medium transition-colors relative',
                    activeTab === 'comments' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                ]">
                    Comments
                    <div v-if="activeTab === 'comments'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600">
                    </div>
                </button>
                <button @click="handleTabClick('history')" :class="[
                    'pb-3 px-1 text-sm font-medium transition-colors relative',
                    activeTab === 'history' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                ]">
                    History
                    <div v-if="activeTab === 'history'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600">
                    </div>
                </button>
            </div>
        </div>

        <div>
            <CommentList v-if="activeTab === 'comments'" :comments="comments" :format-date="formatDate"
                :is-submitting="isSubmitting" @add-comment="handleAddComment"
                @edit-comment="(commentId, content) => $emit('editComment', commentId, content)"
                @delete-comment="$emit('deleteComment', $event)" />

            <HistoryList v-if="activeTab === 'history'" :logs="logs" :format-date="formatDate" />
        </div>
    </div>
</template>

<script setup>
import CommentList from './CommentList.vue'
import HistoryList from './HistoryList.vue'

defineProps({
    logs: Array,
    comments: Array,
    formatDate: Function
})

const emit = defineEmits(['addComment', 'editComment', 'deleteComment', 'tabChange'])

const activeTab = ref('comments')
const isSubmitting = ref(false)

const handleAddComment = async (commentText) => {
    isSubmitting.value = true
    try {
        await emit('addComment', commentText)
    } finally {
        isSubmitting.value = false
    }
}

const handleTabClick = (tab) => {
    activeTab.value = tab
    emit('tabChange', tab)
}
</script>
