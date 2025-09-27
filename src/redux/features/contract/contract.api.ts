import type { TMessage } from "../../../types/contract.types";
import { baseAPI } from "../../api/baseApi";

// Response types
type MessageResponseArray = {
  data: TMessage[];
  success: boolean;
  message: string;
};

type MessageResponseSingle = {
  data: TMessage;
  success: boolean;
  message: string;
};

// Payload type for creating a message
export type MessagePayload = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  attachments?: string; 
  isTermAgreed: boolean;
};

export const messageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // GET all messages
    getMessages: builder.query<TMessage[], void>({
      query: () => ({ url: "/message", method: "GET" }),
      transformResponse: (response: MessageResponseArray) =>
        response.data ?? [],
    }),

    // GET a single message by ID
    getMessageById: builder.query<TMessage, string>({
      query: (id) => ({ url: `/message/${id}`, method: "GET" }),
      transformResponse: (response: MessageResponseSingle) => response.data,
    }),

    // CREATE a new message
    createMessage: builder.mutation<TMessage, MessagePayload>({
      query: (body) => ({
        url: "/message",
        method: "POST",
        body,
      }),
      transformResponse: (response: MessageResponseSingle) => response.data,
    }),

    // DELETE a message
    deleteMessage: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({ url: `/message/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
