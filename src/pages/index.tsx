import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store';
import styles from '@/styles/module/index.module.scss';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isCompleted, currentStep } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (isCompleted) {
      router.push('/home');
    } else {
      // Redirect to the appropriate onboarding step
      const stepPaths = [
        '/onboarding/personal-profile',
        '/onboarding/favorite-songs',
        '/onboarding/payment-information',
        '/onboarding/success',
      ];
      router.push(stepPaths[currentStep - 1]);
    }
  }, [isAuthenticated, isCompleted, currentStep, router]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}
