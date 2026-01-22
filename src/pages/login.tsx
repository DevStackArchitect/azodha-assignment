import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { login } from '@/store/slices/authSlice';
import { VALID_CREDENTIALS } from '@/utils/constants';
import { Input, Button } from '@/components/shared';
import { showSuccessToast, showErrorToast } from '@/utils/toast';
import styles from '@/styles/module/login.module.scss';

// Icons
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="currentColor"
    />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z"
      fill="currentColor"
    />
  </svg>
);

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .matches(/^[a-zA-Z0-9._]+$/, 'Username can only contain letters, numbers, dots, and underscores'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isCompleted } = useAppSelector((state) => state.onboarding);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (isCompleted) {
        router.push('/home');
      } else {
        router.push('/onboarding');
      }
    }
  }, [isAuthenticated, isCompleted, router]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      if (
        values.username === VALID_CREDENTIALS.username &&
        values.password === VALID_CREDENTIALS.password
      ) {
        dispatch(login({ username: values.username }));
        showSuccessToast(`Welcome back, ${values.username}! 👋`);

        if (isCompleted) {
          router.push('/home');
        } else {
          router.push('/onboarding');
        }
      } else {
        setFieldError('password', 'Invalid username or password');
        showErrorToast('Invalid username or password');
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={styles.loginContainer}>
      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo/Icon */}
        <motion.div
          className={styles.logoContainer}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
        >
          <div className={styles.logoBox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 0C12.2156 0 12.4313 0.046875 12.6281 0.135937L21.4547 3.88125C22.486 4.31719 23.2547 5.33438 23.25 6.5625C23.2266 11.2125 21.3141 19.7203 13.2375 23.5875C12.4547 23.9625 11.5453 23.9625 10.7625 23.5875C2.68596 19.7203 0.773459 11.2125 0.750021 6.5625C0.745334 5.33438 1.51408 4.31719 2.54533 3.88125L11.3766 0.135937C11.5688 0.046875 11.7844 0 12 0V0ZM12 3.13125V20.85C18.4688 17.7188 20.2078 10.7859 20.25 6.62813L12 3.13125V3.13125V3.13125" fill="#A78BFA" />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className={styles.titleSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h1 className={styles.title}>Premium Clarity</h1>
          <p className={styles.subtitle}>Enter your credentials to access your space.</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={formik.handleSubmit}
          className={styles.form}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* Username Field */}
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder="your.name"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.username}
            touched={formik.touched.username}
            icon={<UserIcon />}
          />

          {/* Password Field */}
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
            touched={formik.touched.password}
            icon={<LockIcon />}
            labelRight={
              <button type="button" className={styles.forgotButton}>
                Forgot?
              </button>
            }
          />

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={isLoading}
            fullWidth
            showHoverArrow
            className={styles.submitButton}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </motion.form>

        {/* Create Account Link */}
        <motion.div
          className={styles.createAccountSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Don&apos;t have an account?{' '}
          <button type="button" className={styles.createAccountButton}>
            Create one
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
