import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  scrollY: number;
  scrollBarWidth: number;
  scrollDirection: "up" | "down";
}

// All units are in pixels
export const initialState: ScrollState = {
  scrollY: 0,
  scrollBarWidth: 0,
  scrollDirection: "down",
};

const scrollStateSlice = createSlice({
  name: "scrollState",
  initialState,
  reducers: {
    setScrollY(state, action: PayloadAction<number>) {
      if (state.scrollY > action.payload) {
        state.scrollDirection = "up";
      } else if (state.scrollY < action.payload) {
        state.scrollDirection = "down";
      }
      state.scrollY = action.payload;
    },
    setScrollBarWidth(state, action: PayloadAction<number>) {
      state.scrollBarWidth = action.payload;
    },
  },
});

export const { setScrollY, setScrollBarWidth } = scrollStateSlice.actions;

export default scrollStateSlice.reducer;
