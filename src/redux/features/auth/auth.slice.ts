import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../../../types/user.types";
import type { RootState } from "../../store";

type TState = {
  accessToken: string | null;
  user: TUser | null;
};

// Load from localStorage
const storedToken = localStorage.getItem("accessToken");
const storedUser = localStorage.getItem("user");

const initialState: TState = {
  accessToken: storedToken || null,
  user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token?: string; user: TUser | null }>
    ) => {
      state.accessToken =
        (action?.payload?.token as string) ||
        (localStorage.getItem("accessToken") as string);
      state.user = action.payload.user;

      localStorage.setItem("accessToken", action?.payload?.token as string);
      if (action.payload.user) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      document.cookie = "token=; path=/;";
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

// Selectors
export const selectToken = (state: RootState) => state.auth?.accessToken;
export const selectUser = (state: RootState) => state.auth?.user;

export default authSlice.reducer;
