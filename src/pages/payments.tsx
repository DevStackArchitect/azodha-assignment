import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store';
import { Sidebar } from '@/components/shared';
import PaymentInformation from '@/components/onboarding/PaymentInformation';
import styles from '@/styles/module/payments.module.scss';

const PaymentsPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isCompleted } = useAppSelector((state) => state.onboarding);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (!isCompleted) {
      router.push('/onboarding');
    }
  }, [isAuthenticated, isCompleted, router]);

  return (
    <div className={styles.container}>
      <Sidebar activePage="payments" />
      <div className={styles.mainContent}>
        <PaymentInformation showNavigation={false} buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default PaymentsPage;
