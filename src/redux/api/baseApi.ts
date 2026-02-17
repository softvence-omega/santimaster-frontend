import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", accessToken);
    } else {
      console.log(" No access token in Redux state");
    }
    // this.credentials = "include";
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: [
    "donation",
    "category",
    "Users",
    "Sponsorship",
    "content",
    "protocol",
    "Subscriber",
    "users",
    "admindashboard",
    "plan",
    "profile",
    "UserDashboard",
    "blog",
  ],
  endpoints: () => ({}),
});
