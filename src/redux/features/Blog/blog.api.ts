import { baseAPI } from "../../api/baseApi";

const blogApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: ({ search = "", limit = "6", page = "1" }) =>
        `/blog?search=${search}&limit=${limit}&page=${page}`,
      providesTags: ["blog"],
    }),
    getBlogById: build.query({
      query: (id) => `/blog/${id}`,
      providesTags: ["blog"],
    }),
    postNewBlog: build.mutation({
      query: (body) => ({
        url: "/blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: build.mutation({
      query: ({ id, body }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  usePostNewBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
