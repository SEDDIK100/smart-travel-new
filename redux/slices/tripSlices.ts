import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TripState {
  tripName: string;
  travellers: string;
  budget: string;
  destinationType: string;
  travelMood: string;
  tripDuration: string;
  travelDistance: string;
  interests: string;
  travelStyle: string;
}

const initialState: TripState = {
  tripName: "",
  travellers: "",
  budget: "",
  destinationType: "",
  travelMood: "",
  tripDuration: "",
  travelDistance: "",
  interests: "",
  travelStyle: "",
  
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTripName: (state, action: PayloadAction<string>) => { state.tripName = action.payload },
    setBudget: (state, action: PayloadAction<string>) => { state.budget = action.payload },
    setDestinationType: (state, action: PayloadAction<string>) => { state.destinationType = action.payload },
    setTripMood: (state, action: PayloadAction<string>) => { state.travelMood = action.payload },
    setTripDuration: (state, action: PayloadAction<string>) => { state.tripDuration = action.payload },
    setTripDistance: (state, action: PayloadAction<string>) => { state.travelDistance = action.payload },
    setInterests: (state, action: PayloadAction<string>) => { state.interests = action.payload },
    setTripStyle: (state, action: PayloadAction<string>) => { state.travelStyle = action.payload },
    setTripComp: (state, action: PayloadAction<string>) => { state.travellers = action.payload },
    resetTrip: () => initialState,
  },
});

export const {
  setTripName, setBudget,
  setDestinationType, setTripMood, setTripDuration,
  setTripDistance, setInterests, setTripStyle, resetTrip,setTripComp
} = tripSlice.actions;
export default tripSlice.reducer;
export type { TripState };