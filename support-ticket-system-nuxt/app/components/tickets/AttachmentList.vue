<template>
    <div class="space-y-3">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <PaperClipIcon class-name="w-5 h-5 text-gray-600" />
                <h3 class="font-semibold text-gray-900">
                    Attachments ({{ attachments.length }})
                </h3>
            </div>

            <label v-if="canEdit" class="cursor-pointer">
                <input type="file" multiple @change="handleFileChange" class="hidden" :disabled="uploading"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
                <span class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    {{ uploading ? 'Uploading...' : '+ Add files' }}
                </span>
            </label>
        </div>

        <div v-if="attachments.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <PaperClipIcon class-name="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p class="text-gray-500 text-sm">No attachments yet</p>
            <label v-if="canEdit" class="cursor-pointer">
                <input type="file" multiple @change="handleFileChange" class="hidden" :disabled="uploading"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
                <span class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Drop files here or click to upload
                </span>
            </label>
        </div>

        <div v-else class="space-y-2">
            <div v-for="(attachment, index) in attachments" :key="index"
                class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <PaperClipIcon :class-name="`w-5 h-5 ${getFileIcon(attachment.name)}`" />
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ attachment.name }}</p>
                        <p class="text-xs text-gray-500">{{ formatFileSize(attachment.size) }}</p>
                    </div>
                </div>

                <div class="flex items-center gap-2 ml-3">
                    <a v-if="attachment.url && !attachment.isNew" :href="attachment.url" target="_blank"
                        class="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                        title="Download">
                        <DownloadIcon class-name="w-4 h-4" />
                    </a>

                    <button v-if="canEdit" @click="handleDelete(index)"
                        class="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                        title="Remove">
                        <TrashIcon class-name="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import PaperClipIcon from '~/components/icons/PaperClipIcon.vue'
import DownloadIcon from '~/components/icons/DownloadIcon.vue'
import TrashIcon from '~/components/icons/TrashIcon.vue'

const props = defineProps({
    attachments: {
        type: Array,
        default: () => []
    },
    canEdit: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['delete', 'upload'])

const uploading = ref(false)

const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    uploading.value = true
    try {
        emit('upload', files)
    } finally {
        uploading.value = false
        e.target.value = ''
    }
}

const handleDelete = (index) => {
    emit('delete', index)
}

const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

const getFileIcon = (filename) => {
    const ext = filename?.split('.').pop().toLowerCase()
    const iconColors = {
        pdf: 'text-red-600',
        doc: 'text-blue-600',
        docx: 'text-blue-600',
        jpg: 'text-green-600',
        jpeg: 'text-green-600',
        png: 'text-green-600',
    }
    return iconColors[ext] || 'text-gray-600'
}
</script>
