import React from 'react';
import { Toaster } from 'react-hot-toast';

export const ToasterProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1C1C1E',
          color: '#F4F4F2',
          borderRadius: '12px',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#1C1C1E',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#1C1C1E',
          },
        },
      }}
    />
  );
};
