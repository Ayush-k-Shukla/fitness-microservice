import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TTokenData } from 'react-oauth2-code-pkce/dist/types';

export interface IUser {
  email?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
}

export interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; tokenData?: TTokenData }>
    ) => {
      const user: IUser = {
        email: action.payload.tokenData?.['email'],
        firstName: action.payload.tokenData?.['given_name'],
        lastName: action.payload.tokenData?.['family_name'],
        id: action.payload.tokenData?.['sub'],
      };
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
