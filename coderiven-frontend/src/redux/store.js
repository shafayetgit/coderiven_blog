// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { setupListeners } from "@reduxjs/toolkit/query";
import { middleware } from "./middleware";

export const store = configureStore({
  reducer: rootReducer,
  middleware,
});

setupListeners(store.dispatch);
