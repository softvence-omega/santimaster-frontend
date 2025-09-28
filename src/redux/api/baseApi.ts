import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  credentials: "include",
  prepareHeaders(headers, { getState }) {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("Authorization", accessToken); 
      console.log("Attached raw token:", accessToken);
    } else {
      console.log(" No access token in Redux state");
    }
    return headers;
  },
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryAPI,
  tagTypes: [
    "donation",
    "category",
    "Sponsorship",
    "content",
    "privacy-policy",
    "terms",
    "faq",
    "contributor",
    "users",
    "ad-management",
    "plan",
    "profile",
  ],
  endpoints: () => ({}),
});
