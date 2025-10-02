import type { TMessage } from "../../../types/contract.types";
import { baseAPI } from "../../api/baseApi";

// Payload type for creating a message
export type MessagePayload = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  attachments?: string;
  isTermAgreed: boolean;
};

// Define the API with tags for automatic cache invalidation
export const messageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // GET all messages
    getMessages: builder.query<TMessage[], void>({
      query: () => "/message",
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TMessage[];
      }) => response.data || [],
    }),

    // GET a single message by ID
    getMessageById: builder.query<TMessage, string>({
      query: (id) => `/message/${id}`,
      providesTags: (_, __, id) => [{ type: "content", id }],
    }),

    // CREATE a new message
    createMessage: builder.mutation<TMessage, MessagePayload>({
      query: (body) => ({
        url: "/message",
        method: "POST",
        body,
      }),
    }),

    // DELETE a message
    deleteMessage: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/message/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "content", id },
        { type: "content", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
