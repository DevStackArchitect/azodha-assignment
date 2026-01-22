import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { updatePaymentInformation } from '@/store/slices/onboardingSlice';
import { Input, Button, Footer } from '@/components/shared';
import { showSuccessToast } from '@/utils/toast';
import styles from '@/styles/module/payment-information.module.scss';

const validationSchema = Yup.object({
  cardholderName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Cardholder name is required'),
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Format must be MM/YY')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required'),
});

interface PaymentInformationProps {
  onNext?: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  showNavigation?: boolean;
  buttonText?: string;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({
  onNext,
  onBack,
  onSkip,
  showNavigation = true,
  buttonText = 'Securely Save Details'
}) => {
  const dispatch = useAppDispatch();
  const { paymentInformation, personalProfile } = useAppSelector((state) => state.onboarding);

  const formik = useFormik({
    initialValues: {
      cardholderName: paymentInformation.cardholderName || personalProfile.name || '',
      cardNumber: paymentInformation.cardNumber || '',
      expiryDate: paymentInformation.expiryDate || '',
      cvv: paymentInformation.cvv || '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updatePaymentInformation(values));
      showSuccessToast('Payment information saved securely! 🔒');
      if (onNext) {
        onNext();
      }
    },
  });

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const maskCardNumber = (value: string) => {
    if (!value || value.length === 0) {
      return '•••• •••• •••• ••••';
    }
    const cleaned = value.replace(/\s/g, '');
    const groups = [];
    for (let i = 0; i < 16; i += 4) {
      const group = cleaned.slice(i, i + 4).padEnd(4, '•');
      groups.push(group);
    }
    return groups.join(' ');
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '');
    if (/^\d*$/.test(value) && value.length <= 16) {
      formik.setFieldValue('cardNumber', value);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    formik.setFieldValue('expiryDate', value);
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Payment Method</h1>
          <p className={styles.description}>
            Enter your payment details to enable premium features
            <br />
            and seamless billing.
          </p>
        </div>

        {/* Main Content - Two Columns */}
        <div className={styles.mainContent}>
          {/* Left Column - Credit Card Visual */}
          <motion.div
            className={styles.cardColumn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Card */}
            <div className={styles.creditCard}>
              {/* Chip and Logo Row */}
              <div className={styles.cardHeader}>
                {/* Chip */}
                <div className={styles.chip}>
                  <div className={styles.chipGrid}>
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={styles.chipDot} />
                    ))}
                  </div>
                </div>

                {/* VISA Logo */}
                <div className={styles.cardLogo}>VISA</div>
              </div>

              {/* Card Number */}
              <div className={styles.cardNumber}>
                <p>{maskCardNumber(formik.values.cardNumber)}</p>
              </div>

              {/* Card Holder and Expiry */}
              <div className={styles.cardFooter}>
                <div className={styles.cardField}>
                  <p className={styles.cardFieldLabel}>Card Holder</p>
                  <p className={styles.cardFieldValue}>
                    {formik.values.cardholderName || 'YOUR NAME'}
                  </p>
                </div>
                <div className={styles.cardField}>
                  <p className={styles.cardFieldLabel}>Expires</p>
                  <p className={styles.cardFieldMono}>
                    {formik.values.expiryDate || 'MM/YY'}
                  </p>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className={styles.securityBadge}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
                  fill="#A78BFA"
                />
              </svg>
              <span className={styles.badgeText}>SECURE ENCRYPTION</span>
            </div>
            <p className={styles.securityNote}>
              Your data is protected with 256-bit SSL security.
            </p>
          </motion.div>

          {/* Right Column - Form */}
          <motion.form
            onSubmit={formik.handleSubmit}
            className={styles.formColumn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Cardholder Name */}
            <Input
              id="cardholderName"
              name="cardholderName"
              type="text"
              label="Cardholder Name"
              placeholder="John Doe"
              value={formik.values.cardholderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.cardholderName}
              touched={formik.touched.cardholderName}
            />

            {/* Card Number */}
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              label="Card Number"
              placeholder="0000 0000 0000 0000"
              value={formatCardNumber(formik.values.cardNumber)}
              onChange={handleCardNumberChange}
              onBlur={formik.handleBlur}
              error={formik.errors.cardNumber}
              touched={formik.touched.cardNumber}
              icon={
                <svg
                  width="32"
                  height="20"
                  viewBox="0 0 32 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="20" rx="3" fill="#48484A" />
                  <rect x="2" y="2" width="28" height="16" rx="2" fill="#636366" />
                </svg>
              }
            />

            {/* Expiry Date and CVV */}
            <div className={styles.formRow}>
              {/* Expiry Date */}
              <Input
                id="expiryDate"
                name="expiryDate"
                type="text"
                label="Expiry Date"
                placeholder="MM/YY"
                value={formik.values.expiryDate}
                onChange={handleExpiryDateChange}
                onBlur={formik.handleBlur}
                error={formik.errors.expiryDate}
                touched={formik.touched.expiryDate}
                maxLength={5}
              />

              {/* CVV */}
              <Input
                id="cvv"
                name="cvv"
                type="password"
                label="CVV"
                placeholder="•••"
                value={formik.values.cvv}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.cvv}
                touched={formik.touched.cvv}
                maxLength={4}
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#636366" strokeWidth="2" />
                    <path
                      d="M12 16V12M12 8H12.01"
                      stroke="#636366"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                }
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              showHoverArrow
              className={styles.submitButton}
              icon={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M12 16V12M12 8H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              }
              iconPosition="right"
            >
              {buttonText}
            </Button>
          </motion.form>
        </div>

        {/* Navigation Links */}
        {showNavigation && (
          <>
            <div className={styles.navigation}>
              <Button
                type="button"
                variant="text"
                onClick={onBack}
                className={styles.navButton}
              >
                Back
              </Button>
              <span className={styles.divider}>|</span>
              <Button
                type="button"
                variant="text"
                onClick={onSkip}
                className={styles.navButton}
              >
                Skip
              </Button>
            </div>

            {/* Footer */}
            <Footer text="PREMIUM CLARITY © 2024 · FOCUSED EXPERIENCE" className={styles.footer} />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PaymentInformation;
