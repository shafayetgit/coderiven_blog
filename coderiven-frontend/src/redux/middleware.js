// middleware.js
import postReducer from "@/apps/blog/post/postApiSlice";
import categoryReducer from "../apps/blog/category/categorySlice";
import tagReducer from "../apps/blog/tag/tagSlice";
import authApiReducer from "../apps/user/auth/authApiSlice";

export const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware()
    .concat(postReducer.middleware)
    .concat(categoryReducer.middleware)
    .concat(tagReducer.middleware)
    .concat(authApiReducer.middleware);