<template>
    <div>
        <label class="block text-gray-700 text-sm font-medium mb-2">{{ label }}</label>
        <input :type="type" :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
            :placeholder="placeholder" :required="required"
            :class="['w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none', className]" />
    </div>
</template>

<script setup>
defineProps({
    label: String,
    name: String,
    modelValue: [String, Number],
    type: {
        type: String,
        default: 'text'
    },
    required: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: ''
    },
    className: {
        type: String,
        default: ''
    }
})

defineEmits(['update:modelValue'])
</script>
