import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  tripName: string;
  travellers: string;
  vibe: string;
  budget: string;
}

const initialState: TripState = {
  tripName: "",
  travellers: "",
  vibe: "",
  budget: "",
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripName: (state, action: PayloadAction<string>) => {
      state.tripName = action.payload;
    },
    setTravellers: (state, action: PayloadAction<string>) => {
      state.travellers = action.payload;
    },
    setVibe: (state, action: PayloadAction<string>) => {
      state.vibe = action.payload;
    },
    setBudget: (state, action: PayloadAction<string>) => {
      state.budget = action.payload;
    },
    resetTrip: () => initialState,
  },
});

export const { setTripName, setTravellers, setVibe, setBudget, resetTrip } =
  tripSlice.actions;
export default tripSlice.reducer;
export type { TripState };