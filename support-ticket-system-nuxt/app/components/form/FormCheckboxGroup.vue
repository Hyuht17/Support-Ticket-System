<template>
    <div>
        <label class="block text-gray-700 text-sm font-medium mb-3">{{ label }}</label>
        <div class="flex flex-wrap gap-4">
            <label v-for="option in options" :key="option.id" class="inline-flex items-center cursor-pointer">
                <input type="checkbox" :value="option.id" :checked="selectedValues.includes(option.id)"
                    @change="handleChange" class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">{{ option.name }}</span>
            </label>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: String,
    options: {
        type: Array,
        required: true
    },
    selectedValues: {
        type: Array,
        required: true
    },
    fieldName: String
})

const emit = defineEmits(['change'])

const handleChange = (e) => {
    emit('change', e, props.fieldName)
}
</script>
