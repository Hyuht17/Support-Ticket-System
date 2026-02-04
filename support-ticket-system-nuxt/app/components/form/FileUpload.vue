<template>
    <div>
        <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <input type="file" multiple @change="handleFileChange" class="hidden" id="file-upload" />
            <label for="file-upload" class="cursor-pointer">
                <UploadIcon class-name="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p class="text-gray-600">
                    Drag & Drop your files or
                    <span class="text-blue-600 font-medium">Browse</span>
                </p>
            </label>
        </div>

        <div v-if="files.length > 0" class="mt-4 space-y-2">
            <div v-for="(file, index) in files" :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div class="flex items-center gap-3 flex-1 min-w-0">
                    <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                        </path>
                    </svg>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</p>
                        <p class="text-xs text-gray-500">
                            {{ (file.size / 1024).toFixed(2) }} KB
                        </p>
                    </div>
                </div>
                <button type="button" @click="handleRemoveFile(index)"
                    class="ml-3 text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                    title="Remove file">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import UploadIcon from '~/components/icons/UploadIcon.vue'

const props = defineProps({
    files: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['change', 'remove'])

const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    emit('change', [...props.files, ...newFiles])
}

const handleRemoveFile = (index) => {
    emit('remove', index)
}
</script>
