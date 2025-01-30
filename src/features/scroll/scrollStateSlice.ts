import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrollState {
  prevScrollY: number;
  scrollY: number;
  scrollDirection: "up" | "down";
}

// All units are in pixels
export const initialState: ScrollState = {
  prevScrollY: 0,
  scrollY: 0,
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
      state.prevScrollY = state.scrollY;
      state.scrollY = action.payload;
    },
  },
});

export const { setScrollY } = scrollStateSlice.actions;

export default scrollStateSlice.reducer;
