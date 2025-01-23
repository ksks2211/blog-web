import { configureStore } from "@reduxjs/toolkit";
import scrollStateReducer from "./features/scrollState/scrollStateSlice";

const store = configureStore({
  reducer: {
    scrollState: scrollStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
