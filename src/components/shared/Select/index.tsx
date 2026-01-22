import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  error?: string;
  touched?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  touched,
  disabled = false,
  className,
  placeholder,
}) => {
  const showError = touched && error;

  return (
    <motion.div
      className={`${styles.formField} ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>
      <div className={styles.selectWrapper}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`${styles.select} ${showError ? styles.error : ''}`}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? `${id}-error` : undefined}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className={styles.selectIcon}>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
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

export default Select;
