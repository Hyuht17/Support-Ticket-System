<template>
    <Modal :is-open="isOpen" :title="title" @close="$emit('close')">
        <slot />

        <template #actions>
            <button @click="$emit('close')"
                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                {{ buttonText }}
            </button>
        </template>
    </Modal>
</template>

<script setup>
import Modal from './Modal.vue'

defineProps({
    isOpen: Boolean,
    title: String,
    buttonText: {
        type: String,
        default: 'Close'
    }
})

defineEmits(['close'])
</script>
