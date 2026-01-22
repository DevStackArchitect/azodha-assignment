import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import onboardingReducer from './slices/onboardingSlice';
import { RootState } from '@/types';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Custom hooks with typed versions
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
