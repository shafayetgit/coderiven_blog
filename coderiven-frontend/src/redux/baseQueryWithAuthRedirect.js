import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { removeCredentials, setCredentials } from "../apps/user/auth/authSlice";

const cookies = new Cookies();
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const apiBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    const csrfToken = cookies.get("csrftoken");
    if (csrfToken) {
      headers.set("X-CSRFToken", csrfToken);
    }

    return headers;
  },
  credentials: "same-origin",
});

const baseQueryWithAuthRedirect = async (args, api, extraOptions) => {
  const result = await apiBaseQuery(args, api, extraOptions);
  if (result?.data?.isAuthenticated) {
    api.dispatch(setCredentials());
  } else {
    api.dispatch(removeCredentials());
  }

  return result;
};

export default baseQueryWithAuthRedirect;
