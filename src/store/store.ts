import { configureStore } from "@reduxjs/toolkit";
import authStateReducer from "../features/auth/authStateSlice";
import layoutStateReducer from "../features/layout/layoutStateSlice";
import scrollStateReducer from "../features/scroll/scrollStateSlice";

const store = configureStore({
  reducer: {
    scrollState: scrollStateReducer,
    layoutState: layoutStateReducer,
    authState: authStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
