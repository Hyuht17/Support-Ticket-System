<template>
    <span :class="`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`">
        {{ config.label }}
    </span>
</template>

<script setup>
const props = defineProps({
    status: {
        type: String,
        required: true
    }
})

const statusConfig = {
    open: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Open'
    },
    in_progress: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'In Progress'
    },
    closed: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: 'Closed'
    }
}

const config = computed(() => statusConfig[props.status] || statusConfig.open)
</script>
