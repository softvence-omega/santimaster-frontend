import { createSlice } from "@reduxjs/toolkit";
import type { TUser } from "../../../types/user.types";
import type { RootState } from "../../hook";

type Tstate = {
  user: TUser | null;
  accessToken: string | null;
};

// 🔹 Demo User for testing
const demoUser: TUser = {
  fullName: "Abumahid Islam",
  email: "dev.abumahid@gmail.com",
  password: "123456",
  affiliation: "236548963",
  orcid: "156466",
};

const initialState: Tstate = {
  user: demoUser,
  accessToken: "demo-accessToken-12345",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, accessToken } = action.payload || {};
      if (!user || !accessToken) {
        console.error("Invalid payload received:", action.payload);
        return;
      }
      state.accessToken = accessToken;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth?.user || demoUser;
export const selectaccessToken = (state: RootState) => state.auth?.accessToken;

const authReducer = authSlice.reducer;
export default authReducer;
