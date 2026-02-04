<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <component :is="icon" class-name="h-5 w-5 text-gray-400" />
      </div>
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        required
        :class="[
          'w-full py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all',
          icon ? 'pl-12' : 'pl-4',
          $slots.right ? 'pr-12' : 'pr-4'
        ]"
        :placeholder="placeholder"
      />
      <slot name="right" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: String,
  placeholder: String,
  icon: [String, Object]
})

defineEmits(['update:modelValue'])
</script>
