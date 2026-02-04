<template>
  <div class="hidden lg:flex flex-col justify-center space-y-8 px-8 py-12">
    <div class="space-y-6">
      <div class="inline-block p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
        <component :is="icon" class-name="w-12 h-12 text-white" />
      </div>
      <h1 class="text-5xl font-bold text-gray-900 leading-tight">
        {{ title }}
      </h1>
      <p class="text-xl text-gray-600 leading-relaxed">
        {{ subtitle }}
      </p>
    </div>
    <slot name="features" />
  </div>
</template>

<script setup>
defineProps({
  icon: [String, Object],
  title: String,
  subtitle: String
})
</script>
