import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActivityState {
  activityName: string;
  priority:     string;
  themeKey:     string;
  rythme:       string;
  companions:   string;
  duration:     string;
  position:     string;
  activityType: string;
  mood:         string;
  cadre:        string;
}

const initialState: ActivityState = {
  activityName: "",
  priority:     "",
  themeKey:     "adventures",
  rythme:       "",
  companions:   "",
  duration:     "",
  position:     "",
  activityType: "",
  mood:         "",
  cadre:        "",
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setActivityName: (state, action: PayloadAction<string>) => { state.activityName = action.payload },
    setRythme:       (state, action: PayloadAction<string>) => { state.rythme       = action.payload },
    setCompanions:   (state, action: PayloadAction<string>) => { state.companions   = action.payload },
    setDuration:     (state, action: PayloadAction<string>) => { state.duration     = action.payload },
    setPosition:     (state, action: PayloadAction<string>) => { state.position     = action.payload },
    setActivityType: (state, action: PayloadAction<string>) => { state.activityType = action.payload },
    setMood:         (state, action: PayloadAction<string>) => { state.mood         = action.payload },
    setCadre:        (state, action: PayloadAction<string>) => { state.cadre        = action.payload },
    // priority + themeKey set together — same pattern as setTripMood
    setPriority: (state, action: PayloadAction<{ priority: string; themeKey: string }>) => {
      state.priority = action.payload.priority;
      state.themeKey = action.payload.themeKey;
    },
    resetActivity: () => initialState,
  },
});

export const {
  setActivityName, setPriority, setRythme, setCompanions,
  setDuration, setPosition, setActivityType, setMood, setCadre, resetActivity,
} = activitySlice.actions;

export default activitySlice.reducer;