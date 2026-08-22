import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuthRedirect from "../../../redux/baseQueryWithAuthRedirect";

const PREFIX = "/blog/tag"

const tagSlice = createApi({
  reducerPath: "blog.tag",
  baseQuery: baseQueryWithAuthRedirect,
  endpoints: (builder) => ({
    // Tag list
    list: builder.query({
      query: () => `${PREFIX}/list`,
    }),

    // Tag post-list
    postList: builder.query({
      query: (slug) => `${PREFIX}/post-list/${slug}`,
    }),

  }),
});

export const { useListQuery, usePostListQuery } = tagSlice;
export default tagSlice;
