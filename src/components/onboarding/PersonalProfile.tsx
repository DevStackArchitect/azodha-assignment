import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { updatePersonalProfile } from '@/store/slices/onboardingSlice';
import { Input, Button, Footer } from '@/components/shared';
import { showSuccessToast } from '@/utils/toast';
import styles from '@/styles/module/personal-profile.module.scss';
import Image from 'next/image';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),
  age: Yup.number()
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be less than 120')
    .required('Age is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

interface PersonalProfileProps {
  onNext?: () => void;
  onSkip?: () => void;
  showNavigation?: boolean;
  buttonText?: string;
}

const PersonalProfile: React.FC<PersonalProfileProps> = ({
  onNext,
  onSkip,
  showNavigation = true,
  buttonText = 'Continue',
}) => {
  const dispatch = useAppDispatch();
  const { personalProfile } = useAppSelector((state) => state.onboarding);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(
    personalProfile.profilePicture
  );

  const formik = useFormik({
    initialValues: {
      name: personalProfile.name || '',
      age: personalProfile.age || '',
      email: personalProfile.email || '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        updatePersonalProfile({
          ...values,
          profilePicture: profilePicturePreview,
        })
      );
      showSuccessToast('Profile saved successfully! ✨');
      if (onNext) {
        onNext();
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
          <h1 className={styles.title}>Complete your profile</h1>
          <p className={styles.description}>
            Let&apos;s start with the basics. This information will help us personalize
            <br />
            your experience within Premium Clarity.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          {/* Profile Photo Upload */}
          <div className={styles.photoUpload}>
            <div className={styles.photoWrapper}>
              <label htmlFor="profilePicture" className={styles.photoLabel}>
                <div
                  className={`${styles.photoCircle} ${profilePicturePreview ? styles.hasImage : ''}`}
                >
                  {profilePicturePreview ? (
                    <Image src={profilePicturePreview} alt="Profile" width={300} height={300} />
                  ) : (
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 19V5C23 3.9 22.1 3 21 3H3C1.9 3 1 3.9 1 5V19C1 20.1 1.9 21 3 21H21C22.1 21 23 20.1 23 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                        fill="#636366"
                      />
                    </svg>
                  )}
                </div>
                {/* Plus Button */}
                <div className={styles.plusButton}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#1C1C1E" />
                  </svg>
                </div>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.photoInput}
                />
              </label>
            </div>
            <p className={styles.photoText}>Upload Photo</p>
          </div>

          {/* Name and Age */}
          <div className={styles.formRow}>
            {/* Full Name */}
            <Input
              id="name"
              name="name"
              type="text"
              label="Full Name"
              placeholder="Alex Thompson"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name}
              touched={formik.touched.name}
            />

            {/* Age */}
            <Input
              id="age"
              name="age"
              type="number"
              label="Age"
              placeholder="24"
              value={formik.values.age.toString()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.age}
              touched={formik.touched.age}
            />
          </div>

          {/* Email Address */}
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="alex@example.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
            touched={formik.touched.email}
          />

          {/* Continue Button */}
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            showHoverArrow
            className={styles.submitButton}
          >
            {buttonText}
          </Button>
        </form>

        {/* Skip for now */}
        {showNavigation && (
          <>
            <div className={styles.skipSection}>
              <Button
                type="button"
                variant="text"
                fullWidth={false}
                onClick={onSkip}
                className={styles.skipButton}
              >
                Skip for now
              </Button>
            </div>

            {/* Footer */}
            <Footer text="PREMIUM CLARITY © 2024 · PRIVACY FIRST" className={styles.footer} />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PersonalProfile;
