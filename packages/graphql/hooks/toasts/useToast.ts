import { toast } from 'react-toastify';

const useToast = () => {
  
  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: 'top-center',
      theme: 'colored'
    })
  }

  const notifyError = (message:string) => {
    toast.error(message, {
      position: 'top-center',
      theme: 'colored'
    })
  }
  
  return {
    notifySuccess,
    notifyError
  }
}

export default useToast