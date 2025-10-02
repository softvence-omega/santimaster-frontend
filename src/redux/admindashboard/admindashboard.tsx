import type { UserDashboardResponse } from "../../types/admindashboard.type";
import { baseAPI } from "../api/baseApi";

export const adminDashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<UserDashboardResponse, void>({
      query: () => ({
        url: "/protocol/admin-overview",
        method: "GET",
      }),
      providesTags: ["admindashboard", "Users", "protocol", "donation"],
    }),

    updateProtocolStatus: builder.mutation({
      query: (payload) => ({
        url: `/protocol/${payload?.protocolId}`,
        method: "PATCH",
        body: payload?.data,
      }),
      invalidatesTags: ["protocol"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const { useGetAdminDashboardQuery, useUpdateProtocolStatusMutation } =
  adminDashboardAPI;
