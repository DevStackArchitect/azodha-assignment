import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

export interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel';
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  labelRight?: React.ReactNode;
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  icon,
  disabled = false,
  className,
  labelRight,
  maxLength,
}) => {
  const showError = touched && error;

  return (
    <motion.div
      className={`${styles.formField} ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={styles.labelRow}>
        <label htmlFor={id} className={styles.formLabel}>
          {label}
        </label>
        {labelRight && <div className={styles.labelRight}>{labelRight}</div>}
      </div>
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.inputIcon}>{icon}</div>}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${id}-error` : undefined}
          maxLength={maxLength}
        />
      </div>
      <AnimatePresence mode="wait">
        {showError && (
          <motion.div
            id={`${id}-error`}
            className={styles.errorMessage}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Input;
