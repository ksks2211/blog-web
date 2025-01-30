import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidToken } from "./authTokenService";

interface AuthState {
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: isValidToken(),
};

const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn } = authStateSlice.actions;

export default authStateSlice.reducer;
