// API Service cho Nuxt
export default defineNuxtPlugin(() => {
    const api = $fetch.create({
        baseURL: '/api',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
        onRequest({ options }) {
            if (options.body && !(options.body instanceof FormData)) {
                options.headers = {
                    ...options.headers,
                    'Content-Type': 'application/json'
                }
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})
