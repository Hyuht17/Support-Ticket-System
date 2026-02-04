<template>
  <div class="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
    <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-14">
      <div class="flex lg:hidden justify-center mb-10">
        <div class="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <TicketIcon class-name="w-10 h-10 text-white" />
        </div>
      </div>

      <div class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">{{ title }}</h2>
        <p class="text-gray-500">{{ subtitle }}</p>
      </div>

      <slot />

      <div v-if="$slots.footer" class="mt-10 pt-8 border-t border-gray-100 text-center">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String
})
</script>
