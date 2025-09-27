// src/redux/features/Donation/donation.api.ts
import { baseAPI } from "../../api/baseApi";

export type DonationPayload = {
  donationType: "ONE_TIME" | "MONTHLY" | "YEARLY";
  amount: number;
  donarName: string;
  donarEmail: string;
  country: string;
  tribute?: string;
};

type DonationResponse = {
  success: boolean;
  message: string;
  data: {
    stripeCheckout: {
      id: string;
      url: string; 
      payment_status: string;
      [key: string]: any;
    };
    donation: {
      donationType: string;
      amount: number;
      donarName: string;
      donarEmail: string;
      country: string;
      tribute?: string;
      paymentStatus: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export const donationApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createDonation: builder.mutation<DonationResponse, DonationPayload>({
      query: (body) => ({
        url: "/donation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["donation"],
    }),

    getDonations: builder.query<DonationResponse[], void>({
      query: () => ({
        url: "/donation",
        method: "GET",
      }),
      providesTags: ["donation"],
    }),
  }),
});

export const { useCreateDonationMutation, useGetDonationsQuery } = donationApi;
