<template>
    <div>
        <label class="block text-gray-700 text-sm font-medium mb-2">{{ label }}</label>
        <select :name="name" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)"
            :required="required"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    name: String,
    modelValue: [String, Number],
    options: {
        type: Array,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: 'Select option'
    }
})

defineEmits(['update:modelValue'])
</script>
