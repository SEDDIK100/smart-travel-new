import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string|null,
    email: string|null,
    password: string |null,
    username?:string,
    nationality?: string,
    livingIn?: string,
    birthdate? : string,
    age?:number| null,
    gender?: string,
    interrests?: string,
    createdAt?: string;
}
interface Chat {
  id: string;
  createdAt: string;
  messages: { role: string; text: string; createdAt: string }[];
}

interface UserState {
  user: User|null;
  token: string | null;
  chats: Chat[];
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
    setUser: (state, action: PayloadAction<{user:User;token:string|null}>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    // ✅ Nouveau : suppression d'une conversation du store Redux
    removeChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((c) => c.id !== action.payload);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.chats = [];
    },
  },
});

export const { setUser, logout, setChats, removeChat } = userSlice.actions;
export default userSlice.reducer;
export type { User, UserState };