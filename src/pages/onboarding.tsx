import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCurrentStep, completeOnboarding } from '@/store/slices/onboardingSlice';
import PersonalProfile from '@/components/onboarding/PersonalProfile';
import FavoriteSongs from '@/components/onboarding/FavoriteSongs';
import PaymentInformation from '@/components/onboarding/PaymentInformation';
import Success from '@/components/onboarding/Success';
import { StepIndicator } from '@/components/shared';
import styles from '@/styles/module/onboarding.module.scss';

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { completedSteps } = useAppSelector((state) => state.onboarding);

  // Calculate initial step based on completed steps
  const initialStep = useMemo(() => {
    if (completedSteps.includes(3)) return 4; // Success
    if (completedSteps.includes(2)) return 3; // Payment
    if (completedSteps.includes(1)) return 2; // Songs
    return 1; // Profile
  }, [completedSteps]);

  const [activeStep, setActiveStep] = useState(initialStep);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(setCurrentStep(activeStep));
  }, [activeStep, dispatch]);

  const handleNextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSkipToPayment = () => {
    setActiveStep(3);
  };

  const handleSkipToSuccess = () => {
    setActiveStep(4);
  };

  const handleComplete = () => {
    dispatch(completeOnboarding());
    router.push('/home');
  };

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <PersonalProfile
            key="personal-profile"
            onNext={handleNextStep}
            onSkip={handleNextStep}
          />
        );
      case 2:
        return (
          <FavoriteSongs
            key="favorite-songs"
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            onSkip={handleSkipToPayment}
          />
        );
      case 3:
        return (
          <PaymentInformation
            key="payment-information"
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            onSkip={handleSkipToSuccess}
          />
        );
      case 4:
        return (
          <Success
            key="success"
            onContinue={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Step Indicator - Only show for steps 1-3 */}
      {activeStep <= 3 && (
        <div className={styles.stepIndicatorWrapper}>
          <StepIndicator currentStep={activeStep} totalSteps={3} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingPage;
