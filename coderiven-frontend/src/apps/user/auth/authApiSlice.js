import { createApi } from "@reduxjs/toolkit/query/react";

import baseQueryWithAuthRedirect from "@/redux/baseQueryWithAuthRedirect";


const PREFIX = '/user/auth'

const authApiSlice = createApi({
  reducerPath: "user.auth.api",
  baseQuery: baseQueryWithAuthRedirect,
  endpoints: (builder) => ({
    // User sign-in
    signIn: builder.mutation({
      query: (data) => ({
        url: `${PREFIX}/sign-in`,
        method: "POST",
        body: data,
      }),
    }),

    // User sign-in
    googleSignIn: builder.mutation({
      query: (data) => ({
        url: `${PREFIX}/google-sign-in`,
        method: "POST",
        body: data,
      }),
    }),

    // User sign-out
    signOut: builder.mutation({
      query: () => ({
        url: `${PREFIX}/sign-out`,
        method: "POST",
        body:{}
      }),
    }),


  }),
});

export const { useSignInMutation, useSignOutMutation, useGoogleSignInMutation } = authApiSlice;
export default authApiSlice;
