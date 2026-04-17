import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string|null,
    email: string|null,
    password: string |null,
    username?:string,
    birthdate? : string,
    gender?: string,
    createdAt?: string;
}

interface UserState {
  user: User|null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser : (state, action: PayloadAction<{user:User;token:string|null}>)=> {
    console.log("from slice", action.payload.user )
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
export type {User,UserState}