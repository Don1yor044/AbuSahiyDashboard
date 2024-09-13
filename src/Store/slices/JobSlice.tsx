import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  job: string[];
}

const initialState: CounterState = {
  job: [],
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<string[]>) => {
      state.job = action.payload;
    },
  },
});

export const { setJob } = jobSlice.actions;

export default jobSlice.reducer;
