import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices";
import loadingReducer from "./slices/loadingSlices"
export const store = configureStore({
  reducer: {
    user: userReducer,
    loading:loadingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


