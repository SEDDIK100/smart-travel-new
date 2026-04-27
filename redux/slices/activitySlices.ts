import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActivityState {
  activityName: string;
  mood: string;
  position: string;
  activityType: string;
}

const initialState: ActivityState = {
  activityName: "",
  mood: "",
  position: "",
  activityType: "",
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivityName: (state, action: PayloadAction<string>) => {
      state.activityName = action.payload;
    },
    setMood: (state, action: PayloadAction<string>) => {
      state.mood = action.payload;
    },
    setPosition: (state, action: PayloadAction<string>) => {
      state.position = action.payload;
    },
    setActivityType: (state, action: PayloadAction<string>) => {
      state.activityType = action.payload;
    },
    resetActivity: () => initialState,
  },
});

export const {
  setActivityName,
  setMood,
  setPosition,
  setActivityType,
  resetActivity,
} = activitySlice.actions;
export default activitySlice.reducer;
export type { ActivityState };