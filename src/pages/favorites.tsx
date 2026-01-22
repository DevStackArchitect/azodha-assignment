import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store';
import { Sidebar } from '@/components/shared';
import FavoriteSongs from '@/components/onboarding/FavoriteSongs';
import styles from '@/styles/module/favorites.module.scss';

const FavoritesPage: React.FC = () => {
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
      <Sidebar activePage="favorites" />
      <div className={styles.mainContent}>
        <FavoriteSongs showNavigation={false} buttonText="Save Changes" />
      </div>
    </div>
  );
};

export default FavoritesPage;
