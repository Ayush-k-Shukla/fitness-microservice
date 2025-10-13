import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  email?: string;
  firstName?: string;
  id?: string;
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
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUserInfo, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
