import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slices/loadingSlices";
import userReducer from "./slices/userSlices";
import tripReducer from "./slices/tripSlices";
import activityReducer from "./slices/activitySlices";
import planReducer from "./slices/planSlices";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    trip: tripReducer,
    activity: activityReducer,
    plans: planReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;