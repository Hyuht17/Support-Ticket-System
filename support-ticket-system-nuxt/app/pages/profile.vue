<template>
  <div class="p-12 max-w-4xl">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Profile</h1>
    <ProfileInfoCard v-if="user" :user="user" />
    <PasswordChangeCard :logout="logout" />
  </div>
</template>

<script setup>
import ProfileInfoCard from '~/components/profile/ProfileInfoCard.vue'
import PasswordChangeCard from '~/components/profile/PasswordChangeCard.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { user, logout } = useAuth()
</script>
