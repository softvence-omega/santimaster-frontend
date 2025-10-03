import type { UserDashboardResponse } from "../../../types/userdashboard.type";
import { baseAPI } from "../../api/baseApi";

export const userDashboardApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboard: builder.query<UserDashboardResponse, void>({
      query: () => ({
        url: "/protocol/me",
        method: "GET",
      }),
      providesTags: ["UserDashboard"],
    }),

    deleteProtocol: builder.mutation({
      query: (id) => ({
        url: `/protocol/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserDashboard"],
    }),
    // ------delete protocol---
  }),
});

export const { useGetUserDashboardQuery, useDeleteProtocolMutation } =
  userDashboardApi;
