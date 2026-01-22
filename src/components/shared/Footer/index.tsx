import React from 'react';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

interface FooterProps {
  text?: string;
  className?: string;
  animated?: boolean;
}

const Footer: React.FC<FooterProps> = ({
  text = 'PREMIUM CLARITY · YOUR JOURNEY STARTS NOW',
  className,
  animated = false,
}) => {
  const footerClasses = [styles.footer, className].filter(Boolean).join(' ');

  if (animated) {
    return (
      <motion.div
        className={footerClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>{text}</p>
      </motion.div>
    );
  }

  return (
    <div className={footerClasses}>
      <p>{text}</p>
    </div>
  );
};

export default Footer;
