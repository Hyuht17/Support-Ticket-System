<template>
  <button
    type="submit"
    :disabled="loading"
    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
  >
    <span v-if="loading" class="flex items-center justify-center">
      <Icon name="svg-spinners:ring-resize" class="-ml-1 mr-3 h-5 w-5 text-white" />
      {{ loadingText }}
    </span>
    <slot v-else />
  </button>
</template>

<script setup>
defineProps({
  loading: Boolean,
  loadingText: String
})
</script>
