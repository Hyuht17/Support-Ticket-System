<template>
    <span :class="`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`">
        {{ config.label }}
    </span>
</template>

<script setup>
const props = defineProps({
    priority: {
        type: String,
        required: true
    }
})

const priorityConfig = {
    low: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'LOW'
    },
    medium: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        label: 'MEDIUM'
    },
    high: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'HIGH'
    }
}

const config = computed(() => priorityConfig[props.priority] || priorityConfig.low)
</script>
