import type { TAccount } from "../../../types/account.types";

import { baseAPI } from "../../api/baseApi";

// Response types
type AccountResponseArray = {
  data: TAccount[];
  success: boolean;
  message: string;
};

type AccountResponseSingle = {
  data: TAccount;
  success: boolean;
  message: string;
};

// Payload type for creating a message
export type AccountPayload = {
  fullName: string;
  affiliation: string;
  orcid: string;
  bio?: string;
  email: string;
  password: string;
  profileImage?: string;
  lastLoginTime?: Date;
  lastPasswordChange?: Date;
  isDeleted?: boolean;
  accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  isTermAgree?: boolean;
  role:
    | "GUEST"
    | "RESEARCHER"
    | "CLINICIAN"
    | "ENGINEER"
    | "REVIEWER"
    | "DONAR"
    | "ADMIN";
  // coming from if admin confirmed
  additionalInfo?: {
    motivation?: string;
    experience?: string;
    resume?: string;
    googleScholar?: string;
    portfolio?: string;
    availability?: string;
    isAgree?: boolean;
  };
};

export const accountApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // GET all messages
    geTAccounts: builder.query<TAccount[], void>({
      query: () => ({ url: "/message", method: "GET" }),
      transformResponse: (response: AccountResponseArray) =>
        response.data ?? [],
    }),

    // GET a single message by ID
    geTAccountById: builder.query<TAccount, string>({
      query: (id) => ({ url: `/message/${id}`, method: "GET" }),
      transformResponse: (response: AccountResponseSingle) => response.data,
    }),

    // CREATE a new message
    createAccount: builder.mutation<TAccount, AccountPayload>({
      query: (body) => ({
        url: "/auth/update-profile",
        method: "POST",
        body,
      }),
      transformResponse: (response: AccountResponseSingle) => response.data,
    }),

    // DELETE a message
    deleteMessage: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/message/${id}`, method: "DELETE" }),
    }),

    updateAccount: builder.mutation<
      TAccount,
      { data: Partial<AccountPayload>; image?: File }
    >({
      query: ({ data, image }) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        if (image) {
          formData.append("image", image);
        }

        return {
          url: "auth/update-profile",
          method: "PATCH",
          body: formData,
        };
      },
      transformResponse: (response: AccountResponseSingle) => response.data,
    }),
  }),
});

export const {
  useGeTAccountsQuery,
  useGeTAccountByIdQuery,
  useCreateAccountMutation,
  useDeleteMessageMutation,
  useUpdateAccountMutation,
} = accountApi;
