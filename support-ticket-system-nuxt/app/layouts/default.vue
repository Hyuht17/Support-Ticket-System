<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="flex-1 ml-72">
      <main class="min-h-[calc(100vh-4rem)]">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
</script>