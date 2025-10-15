// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------------
// User interface
// ------------------------
export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

// ------------------------
// Auth state interface
// ------------------------
interface AuthState {
  user: User | null;
}

// ------------------------
// Initial state
// ------------------------
const initialState: AuthState = {
  user: null,
};

// ------------------------
// Slice
// ------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// ------------------------
// Exports
// ------------------------
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
