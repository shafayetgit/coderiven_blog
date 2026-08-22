import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeCredentials, setCredentials } from "@/apps/user/auth/authSlice";
import { retrieveData, storeData } from "@/utils/localStorage"; // Adjust the path to your localStorage

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = retrieveData("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = retrieveData("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "user/auth/sign-in/refresh",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        api.dispatch(setCredentials(refreshResult.data));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(removeCredentials());
        window.location.href = "/user/auth/sign-in";
      }
    } else {
      api.dispatch(removeCredentials());
      window.location.href = "/user/auth/sign-in";
    }
  }

  return result;
};

export default baseQueryWithReauth;
