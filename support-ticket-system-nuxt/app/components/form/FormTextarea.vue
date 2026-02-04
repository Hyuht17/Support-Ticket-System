<template>
    <div>
        <label class="block text-gray-700 text-sm font-medium mb-2">{{ label }}</label>
        <textarea :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :rows="rows"
            :placeholder="placeholder" :required="required"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none" />
    </div>
</template>

<script setup>
defineProps({
    label: String,
    name: String,
    modelValue: String,
    rows: {
        type: Number,
        default: 6
    },
    required: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue'])
</script>
