import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthRedirect from "@/redux/baseQueryWithAuthRedirect";

const PREFIX = "/blog/category"


const categorySlice = createApi({
  reducerPath: "blog.category",
  baseQuery: baseQueryWithAuthRedirect,
  endpoints: (builder) => ({
    // Category List
    list: builder.query({
      query: () => `${PREFIX}/list`,
    }),

    // Category post-list
    postList: builder.query({
      query: (id) => `${PREFIX}/post-list/${id}`,
    }),
  }),
});

export const { useListQuery, usePostListQuery } = categorySlice;
export default categorySlice;
