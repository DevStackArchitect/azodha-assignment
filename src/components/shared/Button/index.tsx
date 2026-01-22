import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

export interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  showHoverArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  fullWidth = true,
  onClick,
  className,
  icon,
  iconPosition = 'left',
  showHoverArrow = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    showHoverArrow && styles.withHoverArrow,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-busy={loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="32"
              strokeDashoffset="32"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="32;0"
                dur="1s"
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 12 12"
                to="360 12 12"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      <span className={styles.content}>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
      
      {showHoverArrow && !loading && !disabled && (
        <span className={styles.hoverArrowContainer}>
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className={styles.hoverArrow}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
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
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      )}
    </motion.button>
  );
};

export default Button;
