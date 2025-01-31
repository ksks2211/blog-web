import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidToken } from "./authTokenService";

interface AuthState {
  isLoggedIn: boolean;
  nickname: string;
}

export const initialState: AuthState = {
  isLoggedIn: isValidToken(),
  nickname: "Anonymous",
};

const authStateSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setNickname: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
  },
});

export const { setIsLoggedIn, setNickname } = authStateSlice.actions;

export default authStateSlice.reducer;
