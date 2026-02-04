<template>
    <div class="p-12">
        <div class="mb-8 flex justify-between items-center">
            <div>
                <h1 class="text-4xl font-bold text-gray-900">Labels</h1>
                <p class="text-gray-600 mt-2">
                    Manage ticket labels
                </p>
            </div>
            <button @click="handleCreate"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
                + Add Label
            </button>
        </div>

        <div v-if="loading && labels.length === 0" class="flex items-center justify-center h-64">
            <SpinnerIcon class-name="w-12 h-12 text-blue-600" />
        </div>
        <template v-else>
            <div v-if="loading" class="flex items-center justify-center py-12">
                <SpinnerIcon class-name="w-12 h-12 text-blue-600" />
            </div>
            <GenericTable v-else :items="labels" item-name="label" :show-badge="true" @edit="handleEdit"
                @delete="handleDeleteClick" />
        </template>

        <GenericModal :is-open="isModalOpen" @close="handleCloseModal" @submit="handleSubmit" :item="editingLabel"
            item-name="label" :loading="modalLoading" />

        <ConfirmModal :is-open="deleteConfirm.isOpen" @close="handleCloseDeleteModal" @confirm="handleDeleteConfirm"
            title="Delete Label" message="Are you sure you want to delete this label? This action cannot be undone."
            :loading="modalLoading" />
    </div>
</template>

<script setup>
import GenericTable from '~/components/common/GenericTable.vue'
import GenericModal from '~/components/common/GenericModal.vue'
import ConfirmModal from '~/components/common/ConfirmModal.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const { labels, loading, fetchLabels, createLabel, updateLabel, deleteLabel } = useLabels()
const { showToast } = useToast()

const modalLoading = ref(false)
const isModalOpen = ref(false)
const editingLabel = ref(null)
const deleteConfirm = ref({ isOpen: false, id: null })

onMounted(async () => {
    await fetchLabels()
})

const handleCreate = () => {
    editingLabel.value = null
    isModalOpen.value = true
}

const handleEdit = (label) => {
    editingLabel.value = label
    isModalOpen.value = true
}

const handleCloseModal = () => {
    isModalOpen.value = false
    editingLabel.value = null
}

const handleSubmit = async (formData) => {
    modalLoading.value = true
    try {
        if (editingLabel.value) {
            await updateLabel(editingLabel.value.id, formData)
            showToast('Label updated successfully', 'success')
        } else {
            await createLabel(formData)
            showToast('Label created successfully', 'success')
        }
        isModalOpen.value = false
        editingLabel.value = null
    } catch (error) {
        console.error('Failed to save label:', error)
        showToast(error.response?.data?.errors?.name?.[0] || 'Failed to save label', 'error')
    } finally {
        modalLoading.value = false
    }
}

const handleDeleteClick = (id) => {
    deleteConfirm.value = { isOpen: true, id }
}

const handleCloseDeleteModal = () => {
    deleteConfirm.value = { isOpen: false, id: null }
}

const handleDeleteConfirm = async () => {
    if (!deleteConfirm.value.id) return

    modalLoading.value = true
    try {
        await deleteLabel(deleteConfirm.value.id)
        showToast('Label deleted successfully', 'success')
        deleteConfirm.value = { isOpen: false, id: null }
    } catch (error) {
        console.error('Failed to delete label:', error)
        showToast(error.response?.data?.message || 'Failed to delete label', 'error')
    } finally {
        modalLoading.value = false
    }
}
</script>
