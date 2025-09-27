import { baseAPI } from "../../api/baseApi";

// Request & Response Types
export interface SponsorshipRequest {
  companyName: string;
  contactName: string;
  email: string;
  sponsorshipLevel: string;
  message: string;
}

export interface SponsorshipResponse {
  companyName: string;
  contactName: string;
  email: string;
  sponsorshipLevel: string;
  message: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSponsorshipResponse {
  success: boolean;
  message: string;
  data: SponsorshipResponse;
}

export interface GetSponsorshipsResponse {
  success: boolean;
  message: string;
  data: SponsorshipResponse[];
}

export interface DeleteSponsorshipResponse {
  success: boolean;
  message: string;
  data: null;
}

export const sponsorshipAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createSponsorship: builder.mutation<CreateSponsorshipResponse, SponsorshipRequest>({
      query: (body) => ({
        url: "/sponsor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Sponsorship"],
    }),

    getSponsorships: builder.query<GetSponsorshipsResponse, void>({
      query: () => ({
        url: "/sponsor",
        method: "GET",
      }),
      providesTags: ["Sponsorship"],
    }),

    deleteSponsorship: builder.mutation<DeleteSponsorshipResponse, string>({
      query: (id) => ({
        url: `/sponsor/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sponsorship"],
    }),
  }),
});

export const {
  useCreateSponsorshipMutation,
  useGetSponsorshipsQuery,
  useDeleteSponsorshipMutation,
} = sponsorshipAPI;
