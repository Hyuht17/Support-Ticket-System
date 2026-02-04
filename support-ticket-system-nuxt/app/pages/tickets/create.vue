<template>
    <div class="p-12 max-w-4xl">
        <div class="mb-8 flex items-center gap-4">
            <NuxtLink to="/tickets"
                class="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeftIcon class-name="w-5 h-5" />
                <span class="font-medium">Back</span>
            </NuxtLink>
        </div>

        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900">Create ticket</h1>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
            <FormInput label="Title" name="title" v-model="formData.title" required />

            <FormTextarea label="Message" name="description" v-model="formData.description" required />

            <FormCheckboxGroup v-if="labels.length > 0" label="Labels" :options="labels"
                :selected-values="formData.labels" field-name="labels" @change="handleCheckboxChange" />

            <FormCheckboxGroup v-if="categories.length > 0" label="Categories" :options="categories"
                :selected-values="formData.categories" field-name="categories" @change="handleCheckboxChange" />

            <FormSelect label="Priority" name="priority" v-model="formData.priority" :options="priorityOptions" required
                placeholder="Select priority" />

            <FileUpload :files="files" @change="handleFilesChange" @remove="handleRemoveFile" />

            <div>
                <button type="submit" :disabled="loading"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                    <SpinnerIcon v-if="loading" class-name="w-5 h-5 animate-spin" />
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import FormInput from '~/components/form/FormInput.vue'
import FormTextarea from '~/components/form/FormTextarea.vue'
import FormSelect from '~/components/form/FormSelect.vue'
import FormCheckboxGroup from '~/components/form/FormCheckboxGroup.vue'
import FileUpload from '~/components/form/FileUpload.vue'
import ArrowLeftIcon from '~/components/icons/ArrowLeftIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const toast = useToast()
const { create: createTicket } = useTicketService()
const { getAll: getCategories } = useCategoryService()
const { getAll: getLabels } = useLabelService()

const categories = ref([])
const labels = ref([])
const loading = ref(false)
const files = ref([])

const formData = ref({
    title: '',
    description: '',
    priority: 'medium',
    labels: [],
    categories: [],
})

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]

const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    if (checked) {
        formData.value[field] = [...formData.value[field], parseInt(value)]
    } else {
        formData.value[field] = formData.value[field].filter(id => id !== parseInt(value))
    }
}

const handleFilesChange = (newFiles) => {
    files.value = newFiles
}

const handleRemoveFile = (index) => {
    files.value = files.value.filter((_, i) => i !== index)
}

const handleSubmit = async () => {
    loading.value = true
    try {
        const submitData = new FormData()
        submitData.append('title', formData.value.title)
        submitData.append('description', formData.value.description)
        submitData.append('priority', formData.value.priority)

        formData.value.labels.forEach((id) => submitData.append('labels[]', id))
        formData.value.categories.forEach((id) => submitData.append('categories[]', id))

        if (files.value.length > 0) {
            files.value.forEach((file) => submitData.append('attachments[]', file))
        }

        await createTicket(submitData)
        toast.success('Ticket created successfully!')
        navigateTo('/tickets')
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to create ticket')
    } finally {
        loading.value = false
    }
}

onMounted(async () => {
    try {
        const [categoriesRes, labelsRes] = await Promise.all([
            getCategories(),
            getLabels()
        ])
        categories.value = categoriesRes.data || []
        labels.value = labelsRes.data || []
    } catch (error) {
        console.error('Failed to fetch data:', error)
    }
})
</script>
