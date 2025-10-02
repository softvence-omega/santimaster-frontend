import { baseAPI } from "../../api/baseApi";
import type { ApiResponse } from "../../../types/api.response";
import type { Protocol } from "../../../types/potocols.type";
import type { MyProtocol } from "../../../types/myprotocols.type";

const protocolsApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- Get all protocols -------------------
    getAllProtocols: builder.query<
      { data: Protocol[]; meta?: any },
      { name: string; value: string }[] | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/protocol",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: ApiResponse<Protocol[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["protocol"],
    }),

    // ---------- Get protocol by id ---------------
    getProtocolById: builder.query<Protocol, string>({
      query: (id) => ({
        url: `/protocol/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Protocol>) => response.data,
      providesTags: ["protocol"],
    }),

    // ---------- Add protocol -----------
    addProtocol: builder.mutation({
      query: (data) => ({
        url: "/protocol",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<Protocol>) => response.data,
      invalidatesTags: ["protocol"],
    }),

    // ------------- Update protocol --------------
    updateProtocol: builder.mutation<
      Protocol,
      { id: string } & Partial<Protocol>
    >({
      query: ({ id, ...data }) => ({
        url: `/protocol/${id}`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<Protocol>) => response.data,
      invalidatesTags: ["protocol"],
    }),

    // ---------------- Delete protocol -------------
    deleteProtocol: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/protocol/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<null>) => ({
        success: response.success,
        message: response.message,
      }),
      invalidatesTags: ["protocol"],
    }),
    // -----get my protocols-------
    getmyProtocols: builder.query<
      { data: MyProtocol[]; meta?: any },
      { name: string; value: string }[] | void
    >({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/protocol/my-protocols",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: ApiResponse<Protocol[]>) => {
        return {
          data: response.data.map((protocol) => ({
            ...protocol,
            status: protocol.status as any,
          })) as MyProtocol[],
          meta: response.meta,
        };
      },
      providesTags: ["protocol"],
    }),
  }),
});

export const {
  useGetAllProtocolsQuery,
  useGetProtocolByIdQuery,
  useAddProtocolMutation,
  useUpdateProtocolMutation,
  useDeleteProtocolMutation,
  useGetmyProtocolsQuery,
} = protocolsApi;
