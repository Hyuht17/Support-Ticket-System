<template>
  <aside class="fixed w-72 bg-white shadow-lg top-0 left-0 h-screen overflow-y-auto flex flex-col">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-200">
      <NuxtLink to="/dashboard" class="flex items-center gap-3">
        <LogoIcon class-name="w-8 h-8 text-gray-800" />
        <span class="text-xl font-bold text-gray-800">Support Ticket</span>
      </NuxtLink>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 p-6">
      <ul class="space-y-2">
        <li v-for="item in visibleNavItems" :key="item.path">
          <NuxtLink
            :to="item.path"
            :class="[
              'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors',
              isActive(item.path)
                ? 'bg-gray-100 font-semibold text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            ]"
          >
            <component :is="item.Icon" class-name="w-6 h-6" />
            <span class="text-lg">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- User Profile Section -->
    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center gap-3 px-4 py-3">
        <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
          <span class="text-purple-600 font-semibold text-lg">
            {{ userInitial }}
          </span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium text-gray-800 truncate">{{ user?.name || 'User' }}</div>
          <div class="text-xs text-gray-500 truncate">{{ user?.email || '' }}</div>
        </div>
      </div>
      <div class="mt-2 space-y-1">
        <NuxtLink
          to="/profile"
          class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ProfileIcon class-name="w-5 h-5" />
          <span>Profile</span>
        </NuxtLink>
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
        >
          <LogoutIcon class-name="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import LogoIcon from '~/components/icons/LogoIcon.vue'
import DashboardIcon from '~/components/icons/DashboardIcon.vue'
import TicketIcon from '~/components/icons/TicketIcon.vue'
import UsersIcon from '~/components/icons/UsersIcon.vue'
import FileTextIcon from '~/components/icons/FileTextIcon.vue'
import ArchiveIcon from '~/components/icons/ArchiveIcon.vue'
import TagIcon from '~/components/icons/TagIcon.vue'
import ProfileIcon from '~/components/icons/ProfileIcon.vue'
import LogoutIcon from '~/components/icons/LogoutIcon.vue'

const route = useRoute()
const { user, logout } = useAuth()
const { canViewDashboard, canViewUsers, canViewCategories, canViewLabels, canViewAllLogs } = usePermissions()

const isActive = (path) => route.path === path

const userInitial = computed(() => {
  return user.value?.name?.charAt(0).toUpperCase() || 'U'
})

const allNavItems = computed(() => [
  { path: '/dashboard', label: 'Dashboard', Icon: DashboardIcon, show: canViewDashboard() },
  { path: '/tickets', label: 'Tickets', Icon: TicketIcon, show: true },
  { path: '/users', label: 'Users', Icon: UsersIcon, show: canViewUsers() },
  { path: '/ticket-logs', label: 'Ticket Logs', Icon: FileTextIcon, show: canViewAllLogs() },
  { path: '/categories', label: 'Categories', Icon: ArchiveIcon, show: canViewCategories() },
  { path: '/labels', label: 'Labels', Icon: TagIcon, show: canViewLabels() },
])

const visibleNavItems = computed(() => {
  return allNavItems.value.filter(item => item.show)
})

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>
