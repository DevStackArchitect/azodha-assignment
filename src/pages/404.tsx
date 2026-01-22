import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared';
import styles from '@/styles/module/error.module.scss';

const Custom404: React.FC = () => {
  const router = useRouter();

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
            <circle cx="12" cy="12" r="10" stroke="#A78BFA" strokeWidth="2" />
            <path d="M12 8V12M12 16H12.01" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          className={styles.errorCode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          404
        </motion.h1>

        {/* Error Title */}
        <motion.h2
          className={styles.errorTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Page Not Found
        </motion.h2>

        {/* Error Message */}
        <motion.p
          className={styles.errorMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Let&apos;s get you back on track.
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
            onClick={() => router.push('/home')}
            showHoverArrow
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

          <Button
            variant="outline"
            size="large"
            onClick={() => router.back()}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            iconPosition="left"
          >
            Go Back
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          className={styles.errorFooter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          PREMIUM CLARITY © 2024
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Custom404;
