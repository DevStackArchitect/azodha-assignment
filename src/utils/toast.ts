import toast, { Toaster } from 'react-hot-toast';

// Custom toast configuration matching app theme
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#1C1C1E',
      color: '#F4F4F2',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
    iconTheme: {
      primary: '#10B981',
      secondary: '#1C1C1E',
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#1C1C1E',
      color: '#F4F4F2',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
    iconTheme: {
      primary: '#EF4444',
      secondary: '#1C1C1E',
    },
  });
};

export const showInfoToast = (message: string) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    icon: '✨',
    style: {
      background: '#1C1C1E',
      color: '#F4F4F2',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#1C1C1E',
      color: '#F4F4F2',
      borderRadius: '12px',
      padding: '16px 24px',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    },
  });
};

export { toast, Toaster };
