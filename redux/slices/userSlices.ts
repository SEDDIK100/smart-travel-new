import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
    id: string|null,
    email: string|null,
    password: string |null,
    username?:string,
    birthdate? : string,
    age?:number| null,
    gender?: string,
    createdAt?: string;
}
interface Chat {
  id: string;
  createdAt: string; // ISO string
  messages: { role: string; text: string; createdAt: string }[];
}

interface UserState {
  user: User|null;
  token: string | null;
  chats: Chat[]; // 👈 زيد هذا

}

const initialState: UserState = {
  user: null,
  token: null,
  chats: [],

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser : (state, action: PayloadAction<{user:User;token:string|null}>)=> {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
        state.chats = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.chats = [];
    },
  },
});

export const { setUser, logout, setChats } = userSlice.actions;
export default userSlice.reducer;
export type {User,UserState}