<template>
  <div class="p-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-2">Overview of ticket statistics</p>
    </div>

    <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
      <SpinnerIcon class-name="w-12 h-12 text-blue-600 animate-spin" />
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="(card, index) in statusCards" :key="index" class="bg-white rounded-2xl shadow-sm p-8">
        <div class="flex items-center gap-6">
          <div :class="`${card.bgColor} rounded-full p-5`">
            <TicketIcon :class-name="`w-10 h-10 ${card.iconColor}`" />
          </div>
          <div>
            <p class="text-gray-600 text-lg mb-2">{{ card.label }}</p>
            <p class="text-5xl font-bold text-gray-900">{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TicketIcon from '~/components/icons/TicketIcon.vue'
import SpinnerIcon from '~/components/icons/SpinnerIcon.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { stats, loading, refreshStats } = useDashboard()

onMounted(() => {
  refreshStats()
})

const statusCards = computed(() => [
  {
    label: 'Total Tickets',
    value: stats.value.total,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  {
    label: 'Open',
    value: stats.value.open,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-500',
  },
  {
    label: 'In Progress',
    value: stats.value.in_progress,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-500',
  },
  {
    label: 'Closed',
    value: stats.value.closed,
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-500',
  },
])
</script>
