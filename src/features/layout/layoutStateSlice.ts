import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  isDrawerOpen: boolean;
  isHeaderVisible: boolean;
}

export const initialState: LayoutState = {
  isDrawerOpen: false,
  isHeaderVisible: true,
};

const layoutStateSlice = createSlice({
  name: "layoutState",
  initialState,
  reducers: {
    toggleDrawerState: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    setDrawerOpenState: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setHeaderVisibility: (state, action: PayloadAction<boolean>) => {
      state.isHeaderVisible = action.payload;
    },
  },
});

export const {
  setHeaderVisibility,
  toggleDrawerState,

  setDrawerOpenState,
} = layoutStateSlice.actions;

export default layoutStateSlice.reducer;
