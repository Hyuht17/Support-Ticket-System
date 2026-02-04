<template>
    <Modal :is-open="isOpen" @close="$emit('close')" :title="modalTitle">
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                    Name <span class="text-red-500">*</span>
                </label>
                <input type="text" v-model="formData.name" required
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    :placeholder="`Enter ${itemName} name`" />
            </div>

            <div class="flex gap-3 pt-4">
                <button type="button" @click="$emit('close')" :disabled="loading"
                    class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                    Cancel
                </button>
                <button type="submit" :disabled="loading"
                    class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    <SpinnerIcon v-if="loading" class-name="w-4 h-4" />
                    {{ item ? 'Update' : 'Create' }}
                </button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Modal from './Modal.vue'
import SpinnerIcon from '../icons/SpinnerIcon.vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    item: {
        type: Object,
        default: null
    },
    itemName: {
        type: String,
        default: 'item'
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'submit'])

const formData = ref({
    name: '',
})

const modalTitle = computed(() => {
    const capitalizedItemName = props.itemName.charAt(0).toUpperCase() + props.itemName.slice(1)
    return props.item ? `Edit ${capitalizedItemName}` : `Add ${capitalizedItemName}`
})

watch([() => props.item, () => props.isOpen], () => {
    if (props.item) {
        formData.value = {
            name: props.item.name || '',
        }
    } else {
        formData.value = {
            name: '',
        }
    }
})

const handleSubmit = () => {
    emit('submit', formData.value)
}
</script>
