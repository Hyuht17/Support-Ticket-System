<template>
    <thead class="bg-gray-50">
        <tr>
            <th v-for="header in tableHeaders" :key="header.key"
                :class="`px-6 py-3 text-${header.align} text-xs font-medium text-gray-500 uppercase tracking-wider`">
                {{ header.label }}
            </th>
        </tr>
    </thead>
</template>

<script setup>
const tableHeaders = [
    { key: 'id', label: 'ID', align: 'left' },
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'email', label: 'Email', align: 'left' },
    { key: 'role', label: 'Role', align: 'left' },
    { key: 'joined', label: 'Joined Date', align: 'left' },
    { key: 'actions', label: 'Actions', align: 'right' }
]
</script>
