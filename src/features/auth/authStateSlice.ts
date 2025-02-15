import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getTokenFromBrowser,
  getUserId,
  isValidToken,
} from "./authTokenService";

interface AuthState {
  isLoggedIn: boolean;
  nickname: string;
  userId: string | undefined;
}

export const initialState: AuthState = {
  isLoggedIn: isValidToken(),
  nickname: "Anonymous",
  userId: getUserId(getTokenFromBrowser()),
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
    setUserId: (state, action: PayloadAction<string | undefined>) => {
      state.userId = action.payload;
    },
  },
});

export const { setIsLoggedIn, setNickname, setUserId } = authStateSlice.actions;

export default authStateSlice.reducer;
