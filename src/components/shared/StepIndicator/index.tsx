import React from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  className,
}) => {
  return (
    <motion.div
      className={`${styles.stepIndicator} ${className || ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.stepDots}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <motion.div
            key={index}
            className={`${styles.stepDot} ${index < currentStep ? styles.active : ''}`}
            aria-label={`Step ${index + 1}${index < currentStep ? ' completed' : index === currentStep - 1 ? ' current' : ''}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>
      <motion.p
        className={styles.stepText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        Step {String(currentStep).padStart(2, '0')} / {String(totalSteps).padStart(2, '0')}
      </motion.p>
    </motion.div>
  );
};

export default StepIndicator;
