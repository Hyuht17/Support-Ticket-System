<template>
    <div class="space-y-2" ref="wrapperRef">
        <label class="block text-sm font-medium text-gray-700">
            {{ label }}
        </label>

        <div v-if="selectedAgent"
            class="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
            <div>
                <p class="font-medium text-gray-900">{{ selectedAgent.name }}</p>
                <p class="text-sm text-gray-500">{{ selectedAgent.email }}</p>
            </div>
            <button type="button" @click="handleClear" class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div v-else class="relative">
            <input type="text" v-model="searchTerm" @focus="isOpen = true" placeholder="Search by name or email..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />

            <div v-if="loading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
                <SpinnerIcon class-name="w-5 h-5 text-gray-400" />
            </div>

            <div v-if="isOpen && searchTerm"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div v-if="loading" class="p-4 text-center text-gray-500">
                    <SpinnerIcon class-name="w-6 h-6 mx-auto" />
                </div>
                <template v-else-if="agents.length > 0">
                    <button v-for="agent in agents" :key="agent.id" type="button" @click="handleSelect(agent)"
                        class="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0">
                        <p class="font-medium text-gray-900">{{ agent.name }}</p>
                        <p class="text-sm text-gray-500">{{ agent.email }}</p>
                    </button>
                </template>
                <div v-else class="p-4 text-center text-gray-500">
                    No agents found
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    label: {
        type: String,
        default: 'Assignee'
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const { searchAgents } = useUserService()

const searchTerm = ref('')
const agents = ref([])
const loading = ref(false)
const isOpen = ref(false)
const selectedAgent = ref(null)
const wrapperRef = ref(null)
let debounceTimeout = null

onMounted(() => {
    const handleClickOutside = (event) => {
        if (wrapperRef.value && !wrapperRef.value.contains(event.target)) {
            isOpen.value = false
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    onBeforeUnmount(() => {
        document.removeEventListener('mousedown', handleClickOutside)
        if (debounceTimeout) clearTimeout(debounceTimeout)
    })
})

watch(searchTerm, (newValue) => {
    if (debounceTimeout) clearTimeout(debounceTimeout)
    
    if (newValue.length < 1) {
        agents.value = []
        return
    }

    debounceTimeout = setTimeout(async () => {
        loading.value = true
        try {
            const response = await searchAgents(newValue)
            agents.value = response.data || []
        } catch (error) {
            console.error('Failed to fetch agents:', error)
            agents.value = []
        } finally {
            loading.value = false
        }
    }, 300)
})

watch(() => props.modelValue, async (newValue) => {
    if (newValue && !selectedAgent.value) {
        const agent = agents.value.find(a => a.id === parseInt(newValue))
        if (agent) {
            selectedAgent.value = agent
        }
    }
}, { immediate: true })

const handleSelect = (agent) => {
    selectedAgent.value = agent
    emit('update:modelValue', agent.id)
    emit('change', { target: { name: 'assigned_to_user_id', value: agent.id } })
    searchTerm.value = ''
    isOpen.value = false
}

const handleClear = () => {
    selectedAgent.value = null
    emit('update:modelValue', '')
    emit('change', { target: { name: 'assigned_to_user_id', value: '' } })
    searchTerm.value = ''
}
</script>
