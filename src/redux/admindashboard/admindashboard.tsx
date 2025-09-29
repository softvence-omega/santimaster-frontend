import type { UserDashboardResponse } from "../../types/admindashboard.type";
import { baseAPI } from "../api/baseApi";

export const adminDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<UserDashboardResponse, void>({
      query: () => ({
        url: "/protocol/admin-overview",
        method: "GET",
      }),
      providesTags: ["admindashboard", "users", "protocol", "donation"],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminDashboardAPI;
