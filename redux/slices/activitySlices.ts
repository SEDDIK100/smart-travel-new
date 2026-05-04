import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActivityState {
  activityName: string;
  mood: string;
  position: string;
  duration: string;
  activityType: string;
priority: string;
rythme: string;
cadre: string;
companions: string;
}

const initialState: ActivityState = {
  activityName: "",
  mood: "",
  position: "",
  activityType: "",
  duration: "",
  priority: "",
  rythme: "",
  cadre: "",
  companions: "",
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
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },
    setPriority: (state, action: PayloadAction<string>) => {
      state.priority = action.payload;
    },
    setRythme: (state, action: PayloadAction<string>) => {
      state.rythme = action.payload;
    },
    setCadre: (state, action: PayloadAction<string>) => {
      state.cadre = action.payload;
    },
    setCompanions: (state, action: PayloadAction<string>) => {
      state.companions = action.payload;
    },  
    
    resetActivity: () => initialState,
  },
});

export const {
  setActivityName,
  setMood,
  setPosition,
  setActivityType,
  setDuration,
  setPriority,
  setRythme,
  setCadre,
  setCompanions,
  resetActivity,
} = activitySlice.actions;
export default activitySlice.reducer;
export type { ActivityState };