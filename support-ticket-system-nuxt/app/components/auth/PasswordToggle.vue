<template>
  <button
    type="button"
    @click="$emit('toggle')"
    class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
  >
    <EyeIcon v-if="show" />
    <EyeOffIcon v-else />
  </button>
</template>

<script setup>
defineProps({
  show: Boolean
})

defineEmits(['toggle'])
</script>
