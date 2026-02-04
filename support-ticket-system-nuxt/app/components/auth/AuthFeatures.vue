<template>
  <div class="space-y-4 pt-8">
    <div 
      v-for="(feature, index) in features" 
      :key="index"
      class="flex items-center space-x-4"
    >
      <div :class="['flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center', feature.bgColor]">
        <CheckIcon class-name="w-5 h-5" :style="{ color: feature.iconColor }" />
      </div>
      <span class="text-gray-700 text-lg">{{ feature.text }}</span>
    </div>
  </div>
</template>

<script setup>
import CheckIcon from '~/components/icons/CheckIcon.vue'

defineProps({
  features: {
    type: Array,
    default: () => []
  }
})
</script>
