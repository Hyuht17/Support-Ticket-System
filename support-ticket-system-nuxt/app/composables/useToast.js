// Composable để sử dụng toast dễ dàng hơn
import { useToast as useToastification } from 'vue-toastification'

export const useToast = () => {
  const toast = process.client ? useToastification() : null
  
  const showToast = (message, type = 'success') => {
    if (!toast) return
    
    switch (type) {
      case 'success':
        toast.success(message)
        break
      case 'error':
        toast.error(message)
        break
      case 'info':
        toast.info(message)
        break
      case 'warning':
        toast.warning(message)
        break
      default:
        toast.success(message)
    }
  }
  
  return {
    showToast,
    success: (message) => showToast(message, 'success'),
    error: (message) => showToast(message, 'error'),
    info: (message) => showToast(message, 'info'),
    warning: (message) => showToast(message, 'warning')
  }
}
