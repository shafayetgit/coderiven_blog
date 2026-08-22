import { combineReducers } from "redux";

import appSlice from "./appSlice";
import postApiSlice from "@/apps/blog/post/postApiSlice";
import categorySlice from "@/apps/blog/category/categorySlice";
import tagSlice from "@/apps/blog/tag/tagSlice";
import authApiSlice from "@/apps/user/auth/authApiSlice";
import authSlice from "@/apps/user/auth/authSlice";
import postSlice from "@/apps/blog/post/postSlice";

const rootReducer = combineReducers({
  [appSlice.name]: appSlice.reducer,
  [postApiSlice.reducerPath]: postApiSlice.reducer,
  [postSlice.name]: postSlice.reducer,
  [categorySlice.reducerPath]: categorySlice.reducer,
  [tagSlice.reducerPath]: tagSlice.reducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
