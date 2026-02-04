<template>
    <Modal :is-open="isOpen" :title="title" @close="$emit('close')">
        <p class="text-sm text-gray-500">{{ message }}</p>

        <template #actions>
            <button @click="$emit('confirm')" :disabled="loading"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {{ loading ? 'Processing...' : confirmText }}
            </button>
            <button @click="$emit('close')" :disabled="loading"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {{ cancelText }}
            </button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

defineProps({
    isOpen: Boolean,
    title: String,
    message: String,
    confirmText: {
        type: String,
        default: 'Confirm'
    },
    cancelText: {
        type: String,
        default: 'Cancel'
    },
    loading: {
        type: Boolean,
        default: false
    }
})

defineEmits(['close', 'confirm'])
</script>
