import { baseAPI } from "../../api/baseApi";

// Request & Response Types
export interface SubscriberRequest {
  email: string;
  interest: string;
}

export interface SubscriberResponse {
  email: string;
  interest: string;
 
}

export interface CreateSubscriberResponse {
  success: boolean;
  message: string;
  data: SubscriberResponse;
  meta: null;
}

export interface GetSubscribersResponse {
  success: boolean;
  message: string;
  data: SubscriberResponse[];
  meta: null;
}

export interface DeleteSubscriberResponse {
  success: boolean;
  message: string;
  data: null;
}

export const subscriberAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriber: builder.mutation<CreateSubscriberResponse, SubscriberRequest>({
      query: (body) => ({
        url: "/subscriber",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscriber"],
    }),

    getSubscribers: builder.query<GetSubscribersResponse, void>({
      query: () => ({
        url: "/subscriber",
        method: "GET",
      }),
      providesTags: ["Subscriber"],
    }),

    deleteSubscriber: builder.mutation<DeleteSubscriberResponse, string>({
      query: (id) => ({
        url: `/subscriber/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscriber"],
    }),
  }),
});

export const {
  useCreateSubscriberMutation,
  useGetSubscribersQuery,
  useDeleteSubscriberMutation,
} = subscriberAPI;
