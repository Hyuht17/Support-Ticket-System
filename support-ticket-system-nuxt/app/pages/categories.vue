<template>
    <div class="p-12">
        <div class="mb-8 flex justify-between items-center">
            <div>
                <h1 class="text-4xl font-bold text-gray-900">Categories</h1>
                <p class="text-gray-600 mt-2">
                    Manage ticket categories
                </p>
            </div>
            <button @click="handleCreate"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm">
                + Add Category
            </button>
        </div>

        <div v-if="loading && categories.length === 0" class="flex items-center justify-center h-64">
            <SpinnerIcon class-name="w-12 h-12 text-blue-600" />
        </div>
        <template v-else>
            <div v-if="loading" class="flex items-center justify-center py-12">
                <SpinnerIcon class-name="w-12 h-12 text-blue-600" />
            </div>
            <GenericTable v-else :items="categories" item-name="category" :show-badge="false" @edit="handleEdit"
                @delete="handleDeleteClick" />
        </template>

        <GenericModal :is-open="isModalOpen" @close="handleCloseModal" @submit="handleSubmit" :item="editingCategory"
            item-name="category" :loading="modalLoading" />

        <ConfirmModal :is-open="deleteConfirm.isOpen" @close="handleCloseDeleteModal" @confirm="handleDeleteConfirm"
            title="Delete Category" message="Are you sure you want to delete this category? This action cannot be undone."
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

const { categories, loading, fetchCategories, createCategory, updateCategory, deleteCategory } = useCategories()
const { showToast } = useToast()

const modalLoading = ref(false)
const isModalOpen = ref(false)
const editingCategory = ref(null)
const deleteConfirm = ref({ isOpen: false, id: null })

onMounted(async () => {
    await fetchCategories()
})

const handleCreate = () => {
    editingCategory.value = null
    isModalOpen.value = true
}

const handleEdit = (category) => {
    editingCategory.value = category
    isModalOpen.value = true
}

const handleCloseModal = () => {
    isModalOpen.value = false
    editingCategory.value = null
}

const handleSubmit = async (formData) => {
    modalLoading.value = true
    try {
        if (editingCategory.value) {
            await updateCategory(editingCategory.value.id, formData)
            showToast('Category updated successfully', 'success')
        } else {
            await createCategory(formData)
            showToast('Category created successfully', 'success')
        }
        isModalOpen.value = false
        editingCategory.value = null
    } catch (error) {
        console.error('Failed to save category:', error)
        showToast(error.response?.data?.errors?.name?.[0] || 'Failed to save category', 'error')
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
        await deleteCategory(deleteConfirm.value.id)
        showToast('Category deleted successfully', 'success')
        deleteConfirm.value = { isOpen: false, id: null }
    } catch (error) {
        console.error('Failed to delete category:', error)
        showToast(error.response?.data?.message || 'Failed to delete category', 'error')
    } finally {
        modalLoading.value = false
    }
}
</script>
