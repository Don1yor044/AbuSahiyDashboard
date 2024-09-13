import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "./slices/CompanySlice";
import jobReducer from "./slices/JobSlice";
export const store = configureStore({
  reducer: {
    company: companyReducer,
    job: jobReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
