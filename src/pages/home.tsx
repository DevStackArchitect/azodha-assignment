import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store';
import { Button, Sidebar } from '@/components/shared';
import styles from '@/styles/module/home.module.scss';
import Image from 'next/image';
const HomePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { isCompleted, personalProfile } = useAppSelector((state) => state.onboarding);

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
    <div className={styles.homeContainer}>
      <Sidebar activePage="home" />

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Profile Picture */}
        {(personalProfile?.name || personalProfile?.profilePicture) && (
          <div className={styles.profilePicture}>
            {personalProfile.profilePicture ? (
              <Image src={personalProfile.profilePicture} alt="Profile" width={500} height={500} />
            ) : (
              <div className={styles.profileInitial}>
                {personalProfile.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}
        {/* Welcome Message */}
        <h1 className={styles.welcomeTitle}>
          Welcome back, {personalProfile?.name ? personalProfile.name.split(' ')[0] : 'User'}.
        </h1>

        <p className={styles.welcomeText}>
          Your space is ready. Everything is exactly where you
          <br />
          left it. Take a breath and begin.
        </p>

        {/* Cards Grid */}
        <div className={styles.cardsGrid}>
          {/* Workspace Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                  fill="#636366"
                />
              </svg>
              <span className={styles.cardBadge}>Recent</span>
            </div>
            <h3 className={styles.cardTitle}>Workspace Alpha</h3>
            <p className={styles.cardDescription}>Last edited 2 hours ago</p>
          </div>

          {/* Quick Link Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                  fill="#636366"
                />
              </svg>
              <span className={styles.cardBadge}>Quick Link</span>
            </div>
            <h3 className={styles.cardTitle}>Design Guidelines</h3>
            <p className={styles.cardDescription}>4 pinned resources</p>
          </div>

          {/* Security Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 6V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V6L12 2Z"
                  fill="#636366"
                />
              </svg>
              <span className={styles.cardBadge}>Security</span>
            </div>
            <h3 className={styles.cardTitle}>Account Secure</h3>
            <p className={styles.cardDescription}>Everything looks good</p>
          </div>
        </div>

        {/* Start New Session Button */}
        <Button
          variant="primary"
          size="large"
          fullWidth={false}
          className={styles.startButton}
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          iconPosition="right"
        >
          Start New Session
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
