// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

// Onboarding Step Types
export interface PersonalProfileData {
  name: string;
  age: string;
  email: string;
  location?: string;
  profilePicture: string | null;
}

export interface FavoriteSong {
  id: string;
  title: string;
  artist: string;
}

export interface FavoriteSongsData {
  songs: FavoriteSong[];
}

export interface PaymentInformationData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

// Onboarding State
export interface OnboardingState {
  currentStep: number;
  completedSteps: number[];
  personalProfile: PersonalProfileData;
  favoriteSongs: FavoriteSongsData;
  paymentInformation: PaymentInformationData;
  isCompleted: boolean;
}

// Root State
export interface RootState {
  auth: AuthState;
  onboarding: OnboardingState;
}

// Step Configuration
export interface OnboardingStepConfig {
  id: number;
  title: string;
  description: string;
  path: string;
}
