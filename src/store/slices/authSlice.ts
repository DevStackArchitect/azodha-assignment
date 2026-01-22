import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/types';

const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
    },
    restoreAuth: (state, action: PayloadAction<AuthState>) => {
      return action.payload;
    },
  },
});

export const { login, logout, restoreAuth } = authSlice.actions;
export default authSlice.reducer;
