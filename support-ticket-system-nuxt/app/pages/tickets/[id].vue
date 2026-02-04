<template>
    <div v-if="loading && !currentTicket" class="flex items-center justify-center min-h-[400px]">
        <SpinnerIcon class-name="w-12 h-12 text-blue-600 animate-spin" />
    </div>

    <div v-else-if="!currentTicket" class="p-12">
        <div class="text-center">
            <p class="text-gray-500 text-lg mb-4">Ticket not found</p>
            <NuxtLink to="/tickets" class="text-blue-600 hover:text-blue-800 font-medium">
                Back to Tickets
            </NuxtLink>
        </div>
    </div>

    <div v-else class="p-8">
        <TicketHeader :ticket="currentTicket" :ticket-id="id" :is-editing="isEditing" @edit-toggle="isEditing = !isEditing" />

        <div class="grid grid-cols-3 gap-6">
            <div class="col-span-2 space-y-6">
                <TicketInfo :ticket="currentTicket" :is-editing="isEditing" :submitting="submitting"
                    :form-data="formData" @submit="handleSubmit" @cancel="isEditing = false" 
                    @update-field="handleFieldUpdate" />

                <AttachmentList :attachments="allAttachments" :can-edit="isEditing" @delete="handleDeleteAttachment"
                    @upload="handleUploadFiles" />

                <ActivityTabs :logs="ticketLogs" :comments="comments" :format-date="formatDate"
                    @add-comment="handleAddComment" @edit-comment="handleEditComment"
                    @delete-comment="handleDeleteComment" @tab-change="handleTabChange" />
            </div>

            <TicketSidebar :ticket="currentTicket" :is-editing="isEditing" :form-data="formData"
                :status-options="statusOptions" :priority-options="priorityOptions" :available-labels="labels"
                :available-categories="categories" :format-date="formatDate" @change="handleChange"
                @checkbox-change="handleCheckboxChange" />
        </div>
    </div>
</template>

<script setup>
import TicketHeader from '~/components/tickets/TicketHeader.vue'
import TicketInfo from '~/components/tickets/TicketInfo.vue'
import AttachmentList from '~/components/tickets/AttachmentList.vue'
import ActivityTabs from '~/components/tickets/ActivityTabs.vue'
import TicketSidebar from '~/components/tickets/TicketSidebar.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

const route = useRoute()
const toast = useToast()
const id = route.params.id

const { getById: getTicket, update: updateTicket, getLogs } = useTicketService()
const { create: createComment, update: updateComment, deleteComment, getComments } = useCommentService()
const { getAll: getCategories } = useCategoryService()
const { getAll: getLabels } = useLabelService()

const currentTicket = ref(null)
const comments = ref([])
const categories = ref([])
const labels = ref([])
const ticketLogs = ref([])
const attachments = ref([])
const newFiles = ref([])
const loading = ref(false)
const submitting = ref(false)
const isEditing = ref(false)

const formData = ref({
    title: '',
    description: '',
    status: 'open',
    priority: 'low',
    labels: [],
    categories: [],
    assigned_to_user_id: '',
})

const statusOptions = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'closed', label: 'Closed' },
]

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]

const allAttachments = computed(() => [
    ...attachments.value,
    ...newFiles.value.map((file, index) => ({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
        index: attachments.value.length + index,
        isNew: true
    }))
])

const fetchTicket = async () => {
    loading.value = true
    try {
        const response = await getTicket(id)
        currentTicket.value = response.data.ticket

        formData.value = {
            title: currentTicket.value.title || '',
            description: currentTicket.value.description || '',
            status: currentTicket.value.status || 'open',
            priority: currentTicket.value.priority || 'low',
            labels: currentTicket.value.labels?.map(l => l.id) || [],
            categories: currentTicket.value.categories?.map(c => c.id) || [],
            assigned_to_user_id: currentTicket.value.assigned_to_user_id || '',
        }

        if (currentTicket.value.attachment_urls && Array.isArray(currentTicket.value.attachment_urls)) {
            attachments.value = currentTicket.value.attachment_urls.map((file, index) => ({
                name: file.name,
                url: file.url,
                size: file.size,
                path: file.path,
                index
            }))
        } else {
            attachments.value = []
        }
    } catch (error) {
        console.error('Failed to fetch ticket:', error)
        toast.error('Failed to load ticket')
    } finally {
        loading.value = false
    }
}

const fetchComments = async () => {
    try {
        const response = await getComments(id)
        comments.value = response.data || []
    } catch (error) {
        console.error('Failed to fetch comments:', error)
    }
}

const handleTabChange = async (tab) => {
    if (tab === 'history' && ticketLogs.value.length === 0) {
        try {
            const response = await getLogs(id)
            if (response.data && Array.isArray(response.data)) {
                ticketLogs.value = response.data
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error)
            ticketLogs.value = []
        }
    }
}

const handleUploadFiles = async (files) => {
    newFiles.value = [...newFiles.value, ...files]
    toast.success(`${files.length} file(s) added. Save to upload.`)
}

const handleDeleteAttachment = (index) => {
    if (window.confirm('Are you sure you want to delete this attachment?')) {
        attachments.value = attachments.value.filter((_, i) => i !== index)
        toast.success('Attachment removed. Save to apply changes.')
    }
}

const handleSubmit = async (e) => {
    submitting.value = true
    try {        
        const submitData = new FormData()
        submitData.append('title', formData.value.title)
        submitData.append('description', formData.value.description)
        submitData.append('status', formData.value.status)
        submitData.append('priority', formData.value.priority)

        if (formData.value.assigned_to_user_id) {
            submitData.append('assigned_to_user_id', formData.value.assigned_to_user_id)
        }

        formData.value.labels.forEach((id) => submitData.append('labels[]', id))
        formData.value.categories.forEach((id) => submitData.append('categories[]', id))

        if (newFiles.value.length > 0) {
            newFiles.value.forEach((file) => submitData.append('attachments[]', file))
        }

        const keepFiles = attachments.value.map(a => ({
            path: a.path,
            original_name: a.name,
            size: a.size
        }))
        submitData.append('keep_attachments', JSON.stringify(keepFiles))

        await updateTicket(id, submitData)
        
        newFiles.value = []
        isEditing.value = false
        
        await fetchTicket()
        
        toast.success('Ticket updated successfully')
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update ticket')
    } finally {
        submitting.value = false
    }
}

const handleChange = (e) => {
    const { name, value } = e.target
    formData.value = {
        ...formData.value,
        [name]: value
    }
}

const handleFieldUpdate = (field, value) => {
    formData.value[field] = value
}

const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    if (checked) {
        formData.value[field] = [...formData.value[field], parseInt(value)]
    } else {
        formData.value[field] = formData.value[field].filter(id => id !== parseInt(value))
    }
}

const handleAddComment = async (commentText) => {
    try {
        await createComment(id, { content: commentText })
        toast.success('Comment added successfully')
        await fetchComments()
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to add comment')
    }
}

const handleEditComment = async (commentId, content) => {
    try {
        await updateComment(id, commentId, { content })
        toast.success('Comment updated successfully')
        await fetchComments()
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update comment')
    }
}

const handleDeleteComment = async (commentId) => {
    try {
        await deleteComment(id, commentId)
        toast.success('Comment deleted successfully')
        await fetchComments()
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete comment')
    }
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

onMounted(async () => {
    await Promise.all([
        getCategories().then(res => categories.value = res.data || []),
        getLabels().then(res => labels.value = res.data || []),
        fetchTicket(),
    ])
    await fetchComments()
})
</script>
