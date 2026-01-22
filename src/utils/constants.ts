import { OnboardingStepConfig } from '@/types';

export const VALID_CREDENTIALS = {
  username: process.env.NEXT_PUBLIC_VALID_USERNAME || 'user123',
  password: process.env.NEXT_PUBLIC_VALID_PASSWORD || 'password123',
};

// Onboarding Steps Configuration
export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    id: 1,
    title: 'Personal Profile',
    description: 'Tell us about yourself',
    path: '/onboarding/personal-profile',
  },
  {
    id: 2,
    title: 'Favorite Songs',
    description: 'Share your favorite music',
    path: '/onboarding/favorite-songs',
  },
  {
    id: 3,
    title: 'Payment Information',
    description: 'Add your payment details',
    path: '/onboarding/payment-information',
  },
  {
    id: 4,
    title: 'Success',
    description: 'All set!',
    path: '/onboarding/success',
  },
];

export const TOTAL_STEPS = ONBOARDING_STEPS.length;
