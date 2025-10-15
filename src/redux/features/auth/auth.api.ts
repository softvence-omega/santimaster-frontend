import { baseAPI } from "../../api/baseApi";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),

    verifyOTP: build.mutation({
      query: (data) => ({
        url: "/auth/signup-verify-otp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    updatePassword: build.mutation({
      query: (payload) => ({
        url: "/user/update-password",
        method: "PUT",
        body: payload,
      }),
    }),

    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    
    getMe: build.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),

  // ------ delete user ---

   deleteUserAdmin: build.mutation({
      query: (id) => ({
        url: `/auth/delete-account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"], 
    }),
    
    updateProfileSetting: build.mutation({
      query: (payload) => ({
        url: "/auth/update-profile",
        method: "PATCH",
        body: payload,
      }),
    }),
    
  }),
});



export const {
  useForgotPasswordMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
  useGetMeQuery,
  useUpdateProfileSettingMutation,
  useResetPasswordMutation,
  useDeleteUserAdminMutation
} = userAPI;
