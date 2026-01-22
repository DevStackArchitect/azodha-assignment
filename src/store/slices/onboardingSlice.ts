import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OnboardingState,
  PersonalProfileData,
  FavoriteSongsData,
  PaymentInformationData,
} from '@/types';

const initialState: OnboardingState = {
  currentStep: 1,
  completedSteps: [],
  personalProfile: {
    name: '',
    age: '',
    email: '',
    location: 'New York, US',
    profilePicture: null,
  },
  favoriteSongs: {
    songs: [],
  },
  paymentInformation: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  },
  isCompleted: false,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    updatePersonalProfile: (state, action: PayloadAction<PersonalProfileData>) => {
      state.personalProfile = action.payload;
      if (!state.completedSteps.includes(1)) {
        state.completedSteps.push(1);
      }
    },
    updateFavoriteSongs: (state, action: PayloadAction<FavoriteSongsData>) => {
      state.favoriteSongs = action.payload;
      if (!state.completedSteps.includes(2)) {
        state.completedSteps.push(2);
      }
    },
    updatePaymentInformation: (state, action: PayloadAction<PaymentInformationData>) => {
      state.paymentInformation = action.payload;
      if (!state.completedSteps.includes(3)) {
        state.completedSteps.push(3);
      }
    },
    completeOnboarding: (state) => {
      state.isCompleted = true;
      if (!state.completedSteps.includes(4)) {
        state.completedSteps.push(4);
      }
    },
    resetOnboarding: () => initialState,
    restoreOnboarding: (state, action: PayloadAction<OnboardingState>) => {
      return action.payload;
    },
  },
});

export const {
  setCurrentStep,
  updatePersonalProfile,
  updateFavoriteSongs,
  updatePaymentInformation,
  completeOnboarding,
  resetOnboarding,
  restoreOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
