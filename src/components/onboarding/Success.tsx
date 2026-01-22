import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Footer } from '@/components/shared';
import styles from '@/styles/module/success.module.scss';

interface SuccessProps {
  onContinue: () => void;
}

const Success: React.FC<SuccessProps> = ({ onContinue }) => {
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 3000);
      return () => clearTimeout(timer);
    } else {
      onContinue();
    }
  }, [countdown, onContinue]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Success Animation */}
        <div className={styles.successAnimation}>
          {/* Decorative Dots */}
          <motion.div
            className={`${styles.decorativeDot} ${styles.dot1}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.3,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
          />
          <motion.div
            className={`${styles.decorativeDot} ${styles.dot2}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{
              delay: 0.4,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
          />
          <motion.div
            className={`${styles.decorativeDot} ${styles.dot3}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{
              delay: 0.5,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
          />

          {/* Check Circle */}
          <motion.div
            className={styles.checkCircle}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <motion.svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeInOut' }}
            >
              <motion.path
                d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                fill="#A78BFA"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              />
            </motion.svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          All Set, Welcome.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Your account is ready. We&apos;ve tailored your
          <br />
          experience for maximum focus and clarity.
        </motion.p>

        {/* Completion Badge */}
        <motion.div
          className={styles.completionBadge}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <motion.div
            className={styles.badgeDot}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className={styles.badgeText}>Onboarding Completed</span>
        </motion.div>

        {/* Enter Workspace Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <Button
            onClick={onContinue}
            variant="primary"
            size="large"
            fullWidth={false}
            showHoverArrow
            className={styles.enterButton}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            iconPosition="right"
          >
            Enter Workspace
          </Button>
        </motion.div>

        {/* Countdown Text */}
        <motion.p
          className={styles.countdown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
        >
          Redirecting automatically in {countdown}s
        </motion.p>

        {/* Footer */}
        <Footer 
          text="PREMIUM CLARITY · YOUR JOURNEY STARTS NOW" 
          className={styles.footer}
          animated 
        />
      </div>
    </motion.div>
  );
};

export default Success;
