import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  company: string[];
}

const initialState: CounterState = {
  company: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<string[]>) => {
      state.company = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;

export default companySlice.reducer;
