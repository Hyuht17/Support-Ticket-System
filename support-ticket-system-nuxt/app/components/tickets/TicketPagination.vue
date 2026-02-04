<template>
    <div class="bg-white rounded-lg shadow-sm p-4 mt-6">
        <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ startItem }}</span>
                to
                <span class="font-medium">{{ endItem }}</span>
                of <span class="font-medium">{{ pagination.total }}</span> results
            </div>

            <div class="flex gap-2">
                <button @click="$emit('pageChange', pagination.current_page - 1)"
                    :disabled="pagination.current_page === 1"
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Previous
                </button>

                <div class="flex gap-2">
                    <template v-for="page in pageNumbers" :key="page">
                        <button v-if="typeof page === 'number'" @click="$emit('pageChange', page)" :class="[
                            'px-4 py-2 border rounded-lg transition-colors',
                            pagination.current_page === page
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 hover:bg-gray-50'
                        ]">
                            {{ page }}
                        </button>
                        <span v-else class="px-2 py-2">...</span>
                    </template>
                </div>

                <button @click="$emit('pageChange', pagination.current_page + 1)"
                    :disabled="pagination.current_page === pagination.last_page"
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    pagination: {
        type: Object,
        required: true
    }
})

defineEmits(['pageChange'])

const startItem = computed(() =>
    ((props.pagination.current_page - 1) * props.pagination.per_page) + 1
)

const endItem = computed(() =>
    Math.min(props.pagination.current_page * props.pagination.per_page, props.pagination.total)
)

const pageNumbers = computed(() => {
    const pages = []

    for (let i = 1; i <= props.pagination.last_page; i++) {
        if (
            i === 1 ||
            i === props.pagination.last_page ||
            (i >= props.pagination.current_page - 1 && i <= props.pagination.current_page + 1)
        ) {
            pages.push(i)
        } else if (
            i === props.pagination.current_page - 2 ||
            i === props.pagination.current_page + 2
        ) {
            pages.push('...')
        }
    }

    return pages
})
</script>
