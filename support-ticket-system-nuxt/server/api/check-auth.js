export default defineEventHandler(async (event) => {
    try {
        const cookies = getRequestHeader(event, 'cookie')
        const response = await $fetch('http://localhost:8000/api/auth/me', {
            headers: {
                'Cookie': cookies || '',
                'Accept': 'application/json'
            }
        })

        return {
            authenticated: true,
            user: response.data
        }
    } catch (error) {
        return {
            authenticated: false
        }
    }
})
