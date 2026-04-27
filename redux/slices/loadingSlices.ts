import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  loading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingTrue: (state) => {
      state.loading = true;
    },
    setLoadingFalse: (state) => {
      state.loading = false;
    },
  },
});

export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions;
export default loadingSlice.reducer;