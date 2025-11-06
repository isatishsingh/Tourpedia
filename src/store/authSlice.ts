// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ------------------------
// User interface
// ------------------------
export interface User {
  uid: string;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  photoURL?: string | null;
  phone: string | null;
}

// ------------------------
// Auth state interface
// ------------------------
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}


// ------------------------
// Load localStorage user if exists
// ------------------------
const storedUser = localStorage.getItem("user");

// ------------------------
// Initial state
// ------------------------
const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: !!storedUser,  // Automatically authenticated if user exists
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
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
    state.user = null; // clear stored user
    state.isAuthenticated = false;  // mark logged out
    },
  },
});

// ------------------------
// Exports
// ------------------------
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
