import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared';
import styles from '@/styles/module/error.module.scss';

const Custom500: React.FC = () => {
  const router = useRouter();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorContainer}>
      <motion.div
        className={styles.errorContent}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error Icon */}
        <motion.div
          className={styles.errorIcon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
            <path d="M15 9L9 15M9 9L15 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          className={styles.errorCode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          500
        </motion.h1>

        {/* Error Title */}
        <motion.h2
          className={styles.errorTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Server Error
        </motion.h2>

        {/* Error Message */}
        <motion.p
          className={styles.errorMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Something went wrong on our end. We&apos;re working to fix it.
          <br />
          Please try again in a moment.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className={styles.errorActions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            variant="primary"
            size="large"
            onClick={handleRefresh}
            showHoverArrow
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 7V12L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            }
            iconPosition="left"
          >
            Try Again
          </Button>

          <Button
            variant="outline"
            size="large"
            onClick={() => router.push('/home')}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
              </svg>
            }
            iconPosition="left"
          >
            Go Home
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          className={styles.errorFooter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          PREMIUM CLARITY © 2024 · We&apos;ll be back soon
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Custom500;
