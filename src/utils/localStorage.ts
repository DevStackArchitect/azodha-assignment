import { RootState } from '@/types';

const STORAGE_KEY = 'onboarding-app-state';

export const saveStateToLocalStorage = (state: RootState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

export const loadStateFromLocalStorage = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
