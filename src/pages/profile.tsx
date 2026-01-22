import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store';
import { Sidebar } from '@/components/shared';
import PersonalProfile from '@/components/onboarding/PersonalProfile';
import styles from '@/styles/module/profile.module.scss';

const ProfilePage: React.FC = () => {
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
      <Sidebar activePage="profile" />
      <div className={styles.mainContent}>
        <PersonalProfile 
          showStepIndicator={false}
          showNavigation={false}
          buttonText="Save Changes"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
